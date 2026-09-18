using System;
using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Controls the player's UFO spaceship, handling directional movement, SHIFT dash boost,
    /// obstacle collisions, health, and visual effects.
    /// </summary>
    public class PlayerController : MonoBehaviour
    {
        [Header("Movement Settings")]
        [SerializeField] private float moveSpeed = 6.0f;
        [SerializeField] private float verticalLimit = 4.2f;
        [SerializeField] private float horizontalMin = -7.5f;
        [SerializeField] private float horizontalMax = 7.5f;

        [Header("Dash / Boost Mechanic")]
        [SerializeField] private float dashBoostMultiplier = 2.4f;
        [SerializeField] private float dashDuration = 0.35f;
        [SerializeField] private float dashCooldown = 1.6f;
        private float dashTimer = 0f;
        private float dashCooldownTimer = 0f;
        private bool isDashing = false;

        [Header("Invulnerability & Health")]
        [SerializeField] private float invulnerabilityDuration = 1.6f;
        private float invulnerableTimer = 0f;
        private bool isInvulnerable = false;

        [Header("Components")]
        [SerializeField] private SpriteRenderer spriteRenderer;
        [SerializeField] private TrailRenderer dashTrail;
        [SerializeField] private ParticleSystem thrusterParticles;
        [SerializeField] private ParticleSystem sparkParticles;

        private Rigidbody2D rb;
        private Vector2 movementInput;
        private Vector3 initialPosition = new Vector3(-5f, 0f, 0f);

        public float DashCooldownRatio => Mathf.Clamp01(dashCooldownTimer / dashCooldown);
        public bool IsDashing => isDashing;
        public bool IsInvulnerable => isInvulnerable;

        private void Awake()
        {
            rb = GetComponent<Rigidbody2D>();
            if (spriteRenderer == null) spriteRenderer = GetComponent<SpriteRenderer>();
        }

        private void Start()
        {
            ResetPlayerState();
        }

        public void ResetPlayerState()
        {
            transform.position = initialPosition;
            isDashing = false;
            dashTimer = 0f;
            dashCooldownTimer = 0f;
            isInvulnerable = false;
            invulnerableTimer = 0f;
            if (spriteRenderer != null) spriteRenderer.color = Color.white;
            if (dashTrail != null) dashTrail.emitting = false;
        }

        private void Update()
        {
            if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing)
            {
                return;
            }

            HandleInput();
            HandleDashTimers();
            HandleInvulnerabilityBlink();
        }

        private void FixedUpdate()
        {
            if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing)
            {
                if (rb != null) rb.velocity = Vector2.zero;
                return;
            }

            ApplyMovement();
        }

        private void HandleInput()
        {
            // Keyboard / Controller input
            float moveX = Input.GetAxisRaw("Horizontal");
            float moveY = Input.GetAxisRaw("Vertical");

            // Mouse / Touch drag support for tablets/kids
            if (Input.GetMouseButton(0) && Camera.main != null)
            {
                Vector3 worldMouse = Camera.main.ScreenToWorldPoint(Input.mousePosition);
                Vector2 diff = (Vector2)worldMouse - (Vector2)transform.position;
                if (diff.magnitude > 0.2f)
                {
                    moveX = Mathf.Clamp(diff.x * 2.5f, -1f, 1f);
                    moveY = Mathf.Clamp(diff.y * 2.5f, -1f, 1f);
                }
            }

            movementInput = new Vector2(moveX, moveY).normalized;

            // Trigger SHIFT dash / boost
            if ((Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.RightShift) || Input.GetKeyDown(KeyCode.Space) || Input.GetMouseButtonDown(1)) && dashCooldownTimer <= 0f && !isDashing)
            {
                PerformDash();
            }
        }

        private void ApplyMovement()
        {
            float speed = moveSpeed;
            if (isDashing)
            {
                speed *= dashBoostMultiplier;
            }

            Vector2 targetVelocity = movementInput * speed;
            if (rb != null)
            {
                rb.velocity = targetVelocity;
            }
            else
            {
                transform.position += (Vector3)(targetVelocity * Time.fixedDeltaTime);
            }

            // Clamp position inside screen bounds
            float clampedX = Mathf.Clamp(transform.position.x, horizontalMin, horizontalMax);
            float clampedY = Mathf.Clamp(transform.position.y, -verticalLimit, verticalLimit);
            transform.position = new Vector3(clampedX, clampedY, transform.position.z);

            // Subtle tilt for aerodynamic feel
            float targetZRot = -movementInput.y * 14f;
            transform.rotation = Quaternion.Euler(0f, 0f, Mathf.LerpAngle(transform.eulerAngles.z, targetZRot, Time.fixedDeltaTime * 8f));
        }

        private void PerformDash()
        {
            isDashing = true;
            dashTimer = dashDuration;
            dashCooldownTimer = dashCooldown;

            if (dashTrail != null) dashTrail.emitting = true;
            if (AudioManager.Instance != null) AudioManager.Instance.PlayDash();
        }

        private void HandleDashTimers()
        {
            if (isDashing)
            {
                dashTimer -= Time.deltaTime;
                if (dashTimer <= 0f)
                {
                    isDashing = false;
                    if (dashTrail != null) dashTrail.emitting = false;
                }
            }

            if (dashCooldownTimer > 0f)
            {
                dashCooldownTimer -= Time.deltaTime;
            }
        }

        private void HandleInvulnerabilityBlink()
        {
            if (isInvulnerable)
            {
                invulnerableTimer -= Time.deltaTime;
                if (spriteRenderer != null)
                {
                    float alpha = (Mathf.Sin(Time.time * 24f) > 0) ? 0.3f : 0.9f;
                    Color c = spriteRenderer.color;
                    c.a = alpha;
                    spriteRenderer.color = c;
                }

                if (invulnerableTimer <= 0f)
                {
                    isInvulnerable = false;
                    if (spriteRenderer != null)
                    {
                        Color c = spriteRenderer.color;
                        c.a = 1f;
                        spriteRenderer.color = c;
                    }
                }
            }
        }

        public void TakeDamage()
        {
            if (isInvulnerable || isDashing) return;

            isInvulnerable = true;
            invulnerableTimer = invulnerabilityDuration;

            if (sparkParticles != null) sparkParticles.Play();
            if (AudioManager.Instance != null) AudioManager.Instance.PlayHit();

            if (GameManager.Instance != null)
            {
                GameManager.Instance.LoseLife();
            }
        }

        private void OnTriggerEnter2D(Collider2D collision)
        {
            if (collision.CompareTag("Obstacle"))
            {
                TakeDamage();
            }
            else if (collision.CompareTag("Coin"))
            {
                Coin coin = collision.GetComponent<Coin>();
                if (coin != null)
                {
                    coin.Collect();
                }
            }
        }
    }
}

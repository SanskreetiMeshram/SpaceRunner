using System;
using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Full 3D Player Spaceship Controller handling 3D flight physics, banking roll,
    /// pitch tilt, SHIFT warp dash, and 3D collision detection.
    /// </summary>
    public class PlayerController3D : MonoBehaviour
    {
        [Header("3D Movement Settings")]
        [SerializeField] private float flightSpeed = 12.0f;
        [SerializeField] private float minX = -15.0f;
        [SerializeField] private float maxX = 15.0f;
        [SerializeField] private float minY = -7.5f;
        [SerializeField] private float maxY = 8.5f;

        [Header("Banking & Aerodynamics")]
        [SerializeField] private float maxRollAngle = 28.0f;
        [SerializeField] private float maxPitchAngle = 18.0f;
        [SerializeField] private float bankLerpSpeed = 8.0f;

        [Header("3D Warp Dash Mechanic")]
        [SerializeField] private float dashSpeedMultiplier = 1.35f;
        [SerializeField] private float dashDuration = 0.45f;
        [SerializeField] private float dashCooldown = 1.8f;
        private float dashTimer = 0f;
        private float dashCooldownTimer = 0f;
        private bool isDashing = false;

        [Header("Invulnerability")]
        [SerializeField] private float invulnerabilityDuration = 1.8f;
        private float invulnerableTimer = 0f;
        private bool isInvulnerable = false;

        [Header("3D Visuals & Components")]
        [SerializeField] private Transform shipModelTransform;
        [SerializeField] private TrailRenderer[] warpTrails;
        [SerializeField] private ParticleSystem engineExhaustParticles;
        [SerializeField] private Light engineGlowLight;

        private Rigidbody rb;
        private Vector2 moveInput;
        private Vector3 startPosition = Vector3.zero;

        public float DashCooldownRatio => Mathf.Clamp01(dashCooldownTimer / dashCooldown);
        public bool IsDashing => isDashing;
        public bool IsInvulnerable => isInvulnerable;

        private void Awake()
        {
            rb = GetComponent<Rigidbody>();
            if (rb != null)
            {
                rb.useGravity = false;
                rb.isKinematic = true;
            }
            startPosition = transform.position;
        }

        public void ResetFlightState()
        {
            transform.position = startPosition;
            transform.rotation = Quaternion.identity;
            isDashing = false;
            dashTimer = 0f;
            dashCooldownTimer = 0f;
            isInvulnerable = false;
            invulnerableTimer = 0f;

            if (warpTrails != null)
            {
                foreach (var trail in warpTrails)
                {
                    if (trail != null) trail.emitting = false;
                }
            }
        }

        private void Update()
        {
            if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing)
            {
                return;
            }

            HandleInput();
            HandleDashTimers();
            HandleInvulnerabilityFlash();
        }

        private void FixedUpdate()
        {
            if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing)
            {
                return;
            }

            Apply3DFlight();
        }

        private void HandleInput()
        {
            float x = Input.GetAxisRaw("Horizontal");
            float y = Input.GetAxisRaw("Vertical");

            // Mouse flight support
            if (Input.GetMouseButton(0) && Camera.main != null)
            {
                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                Plane flightPlane = new Plane(Vector3.forward, transform.position);
                if (flightPlane.Raycast(ray, out float enter))
                {
                    Vector3 worldPoint = ray.GetPoint(enter);
                    Vector3 delta = worldPoint - transform.position;
                    if (delta.magnitude > 0.4f)
                    {
                        x = Mathf.Clamp(delta.x * 2.0f, -1f, 1f);
                        y = Mathf.Clamp(delta.y * 2.0f, -1f, 1f);
                    }
                }
            }

            moveInput = new Vector2(x, y).normalized;

            // Trigger SHIFT Warp Dash
            if ((Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.RightShift) || Input.GetKeyDown(KeyCode.Space) || Input.GetMouseButtonDown(1))
                && dashCooldownTimer <= 0f && !isDashing)
            {
                PerformWarpDash();
            }
        }

        private void Apply3DFlight()
        {
            float speed = flightSpeed;
            if (isDashing) speed *= dashSpeedMultiplier;

            Vector3 deltaMove = new Vector3(moveInput.x * speed * Time.fixedDeltaTime, moveInput.y * speed * Time.fixedDeltaTime, 0f);
            transform.position += deltaMove;

            // Clamp inside 3D boundaries
            float clampedX = Mathf.Clamp(transform.position.x, minX, maxX);
            float clampedY = Mathf.Clamp(transform.position.y, minY, maxY);
            transform.position = new Vector3(clampedX, clampedY, transform.position.z);

            // Apply 3D Banking (Roll Z and Pitch X)
            float targetRoll = -moveInput.x * maxRollAngle;
            float targetPitch = moveInput.y * maxPitchAngle;

            Quaternion targetRotation = Quaternion.Euler(targetPitch, 0f, targetRoll);
            Transform targetTransform = (shipModelTransform != null) ? shipModelTransform : transform;
            targetTransform.rotation = Quaternion.Slerp(targetTransform.rotation, targetRotation, Time.fixedDeltaTime * bankLerpSpeed);
        }

        private void PerformWarpDash()
        {
            isDashing = true;
            dashTimer = dashDuration;
            dashCooldownTimer = dashCooldown;

            if (warpTrails != null)
            {
                foreach (var trail in warpTrails)
                {
                    if (trail != null) trail.emitting = true;
                }
            }

            if (engineGlowLight != null) engineGlowLight.intensity = 5.0f;
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
                    if (warpTrails != null)
                    {
                        foreach (var trail in warpTrails)
                        {
                            if (trail != null) trail.emitting = false;
                        }
                    }
                    if (engineGlowLight != null) engineGlowLight.intensity = 2.0f;
                }
            }

            if (dashCooldownTimer > 0f)
            {
                dashCooldownTimer -= Time.deltaTime;
            }
        }

        private void HandleInvulnerabilityFlash()
        {
            if (isInvulnerable)
            {
                invulnerableTimer -= Time.deltaTime;
                if (shipModelTransform != null)
                {
                    bool visible = (Mathf.Sin(Time.time * 28f) > 0);
                    shipModelTransform.gameObject.SetActive(visible);
                }

                if (invulnerableTimer <= 0f)
                {
                    isInvulnerable = false;
                    if (shipModelTransform != null) shipModelTransform.gameObject.SetActive(true);
                }
            }
        }

        public void TakeDamage3D()
        {
            if (isInvulnerable || isDashing) return;

            isInvulnerable = true;
            invulnerableTimer = invulnerabilityDuration;

            if (AudioManager.Instance != null) AudioManager.Instance.PlayHit();
            if (GameManager.Instance != null) GameManager.Instance.LoseLife();
        }

        private void OnTriggerEnter(Collider other)
        {
            if (other.CompareTag("Obstacle"))
            {
                TakeDamage3D();
            }
            else if (other.CompareTag("Coin"))
            {
                Coin3D coin = other.GetComponent<Coin3D>();
                if (coin != null)
                {
                    coin.Collect3D();
                }
            }
        }
    }
}

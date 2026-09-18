using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Space obstacle (asteroid, debris, energy barrier) that flies toward the player from the right.
    /// </summary>
    public class Obstacle : MonoBehaviour
    {
        [SerializeField] private float rotationSpeed = 45f;
        [SerializeField] private float despawnX = -12f;

        private float currentSpeed = 4f;
        private bool isActive = false;

        public void Initialize(float speed, Sprite sprite = null)
        {
            currentSpeed = speed;
            rotationSpeed = Random.Range(-90f, 90f);
            isActive = true;
            gameObject.SetActive(true);

            if (sprite != null)
            {
                SpriteRenderer sr = GetComponent<SpriteRenderer>();
                if (sr != null) sr.sprite = sprite;
            }
        }

        private void Update()
        {
            if (!isActive) return;
            if (GameManager.Instance != null && GameManager.Instance.CurrentState != GameState.Playing) return;

            // Move leftwards
            transform.position += Vector3.left * currentSpeed * Time.deltaTime;

            // Tumble rotate
            transform.Rotate(0f, 0f, rotationSpeed * Time.deltaTime);

            // Despawn once off screen
            if (transform.position.x < despawnX)
            {
                Deactivate();
            }
        }

        public void Deactivate()
        {
            isActive = false;
            gameObject.SetActive(false);
        }
    }
}

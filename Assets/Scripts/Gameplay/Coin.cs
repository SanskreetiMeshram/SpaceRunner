using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Curriculum Question Coin that floats through space. Touching a coin pauses the runner
    /// and triggers a curriculum quiz question.
    /// </summary>
    public class Coin : MonoBehaviour
    {
        [SerializeField] private float bobAmplitude = 0.35f;
        [SerializeField] private float bobFrequency = 3.5f;
        [SerializeField] private float despawnX = -12f;

        private float currentSpeed = 4f;
        private float initialY;
        private float lifeTimer = 0f;
        private bool isCollected = false;

        public void Initialize(float speed)
        {
            currentSpeed = speed;
            initialY = transform.position.y;
            lifeTimer = Random.Range(0f, Mathf.PI * 2f);
            isCollected = false;
            gameObject.SetActive(true);
        }

        private void Update()
        {
            if (isCollected) return;
            if (GameManager.Instance != null && GameManager.Instance.CurrentState != GameState.Playing) return;

            lifeTimer += Time.deltaTime;

            // Move leftwards
            float newX = transform.position.x - (currentSpeed * Time.deltaTime);
            // Bob vertically in gentle wave
            float newY = initialY + Mathf.Sin(lifeTimer * bobFrequency) * bobAmplitude;

            transform.position = new Vector3(newX, newY, transform.position.z);

            if (transform.position.x < despawnX)
            {
                Deactivate();
            }
        }

        public void Collect()
        {
            if (isCollected) return;
            isCollected = true;

            if (AudioManager.Instance != null) AudioManager.Instance.PlayCoin();

            // Trigger quiz popup via GameManager
            if (GameManager.Instance != null)
            {
                GameManager.Instance.TriggerQuestionEvent();
            }

            Deactivate();
        }

        public void Deactivate()
        {
            gameObject.SetActive(false);
        }
    }
}

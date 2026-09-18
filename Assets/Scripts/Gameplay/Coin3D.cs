using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// 3D Question Coin that floats along the space corridor with glowing energy ring,
    /// dynamic light, and quiz triggers.
    /// </summary>
    public class Coin3D : MonoBehaviour
    {
        [SerializeField] private float rotationSpeedY = 160f;
        [SerializeField] private float bobAmplitude = 0.5f;
        [SerializeField] private float bobFrequency = 3.5f;
        [SerializeField] private float despawnZ = 20.0f;

        private float forwardSpeed = 30.0f;
        private float initialY;
        private float lifeTimer = 0f;
        private bool isCollected = false;

        public void Initialize3D(float speed)
        {
            forwardSpeed = speed;
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

            // Move forward along Z
            float newZ = transform.position.z + (forwardSpeed * Time.deltaTime);
            // Bob vertically
            float newY = initialY + Mathf.Sin(lifeTimer * bobFrequency) * bobAmplitude;

            transform.position = new Vector3(transform.position.x, newY, newZ);
            // Spin on Y axis
            transform.Rotate(0f, rotationSpeedY * Time.deltaTime, 0f, Space.Self);

            if (transform.position.z > despawnZ)
            {
                Deactivate3D();
            }
        }

        public void Collect3D()
        {
            if (isCollected) return;
            isCollected = true;

            if (AudioManager.Instance != null) AudioManager.Instance.PlayCoin();

            if (GameManager.Instance != null)
            {
                GameManager.Instance.TriggerQuestionEvent();
            }

            Deactivate3D();
        }

        public void Deactivate3D()
        {
            gameObject.SetActive(false);
        }
    }
}

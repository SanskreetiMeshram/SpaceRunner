using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// 3D Asteroid obstacle with multi-axis rotational tumbling and forward Z-axis movement.
    /// </summary>
    public class Obstacle3D : MonoBehaviour
    {
        [SerializeField] private Vector3 tumbleAngularVelocity;
        [SerializeField] private float despawnZ = 20.0f;

        private float forwardSpeed = 30.0f;
        private bool isActive = false;

        public void Initialize3D(float speed)
        {
            forwardSpeed = speed;
            tumbleAngularVelocity = new Vector3(
                Random.Range(-90f, 90f),
                Random.Range(-90f, 90f),
                Random.Range(-90f, 90f)
            );
            isActive = true;
            gameObject.SetActive(true);
        }

        private void Update()
        {
            if (!isActive) return;
            if (GameManager.Instance != null && GameManager.Instance.CurrentState != GameState.Playing) return;

            // Move towards camera (increasing Z)
            transform.position += Vector3.forward * forwardSpeed * Time.deltaTime;

            // Tumble on all 3 axes
            transform.Rotate(tumbleAngularVelocity * Time.deltaTime);

            // Despawn once behind camera
            if (transform.position.z > despawnZ)
            {
                Deactivate3D();
            }
        }

        public void Deactivate3D()
        {
            isActive = false;
            gameObject.SetActive(false);
        }
    }
}

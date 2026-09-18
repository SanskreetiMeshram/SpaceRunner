using System.Collections.Generic;
using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Spawns 3D asteroids ahead of the player in 3D coordinates using object pooling.
    /// </summary>
    public class ObstacleSpawner3D : MonoBehaviour
    {
        [Header("Prefab")]
        [SerializeField] private GameObject obstacle3DPrefab;

        [Header("Spawn Volume")]
        [SerializeField] private float spawnZ = -280.0f;
        [SerializeField] private float minX = -14.0f;
        [SerializeField] private float maxX = 14.0f;
        [SerializeField] private float minY = -6.0f;
        [SerializeField] private float maxY = 8.0f;

        [Header("Pool Size")]
        [SerializeField] private int poolSize = 14;

        private List<Obstacle3D> pool = new List<Obstacle3D>();
        private float spawnTimer = 0f;
        private float currentSpawnInterval = 2.4f;

        private void Awake()
        {
            InitializePool();
        }

        private void InitializePool()
        {
            for (int i = 0; i < poolSize; i++)
            {
                GameObject obj;
                if (obstacle3DPrefab != null)
                {
                    obj = Instantiate(obstacle3DPrefab, transform);
                }
                else
                {
                    obj = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                    obj.name = $"Obstacle3D_{i}";
                    obj.transform.SetParent(transform);
                    obj.tag = "Obstacle";
                    SphereCollider col = obj.GetComponent<SphereCollider>();
                    if (col != null) col.isTrigger = true;
                    obj.AddComponent<Obstacle3D>();
                }
                obj.SetActive(false);
                pool.Add(obj.GetComponent<Obstacle3D>());
            }
        }

        public void ResetSpawner3D(float interval)
        {
            currentSpawnInterval = interval;
            spawnTimer = 1.0f;
            foreach (var obs in pool)
            {
                if (obs != null) obs.Deactivate3D();
            }
        }

        private void Update()
        {
            if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing)
            {
                return;
            }

            spawnTimer -= Time.deltaTime;
            if (spawnTimer <= 0f)
            {
                Spawn3DAsteroid();
                float speedBonus = GameManager.Instance.CoinsCollectedInLevel * 0.05f;
                spawnTimer = Mathf.Max(1.1f, currentSpawnInterval - speedBonus);
            }
        }

        private void Spawn3DAsteroid()
        {
            Obstacle3D obs = GetPooledObstacle();
            if (obs == null) return;

            float x = Random.Range(minX, maxX);
            float y = Random.Range(minY, maxY);
            obs.transform.position = new Vector3(x, y, spawnZ);

            float speed = GameManager.Instance.CurrentLevelSpeed * 6.5f;
            obs.Initialize3D(speed);
        }

        private Obstacle3D GetPooledObstacle()
        {
            for (int i = 0; i < pool.Count; i++)
            {
                if (!pool[i].gameObject.activeInHierarchy)
                {
                    return pool[i];
                }
            }
            return null;
        }
    }
}

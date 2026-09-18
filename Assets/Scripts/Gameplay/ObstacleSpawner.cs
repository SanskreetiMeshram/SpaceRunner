using System.Collections.Generic;
using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Spawns obstacles ahead of the player using object pooling and dynamically scales difficulty.
    /// </summary>
    public class ObstacleSpawner : MonoBehaviour
    {
        [Header("Prefab & Sprites")]
        [SerializeField] private GameObject obstaclePrefab;
        [SerializeField] private Sprite[] obstacleSprites;

        [Header("Spawn Bounds")]
        [SerializeField] private float spawnX = 11.5f;
        [SerializeField] private float minY = -3.8f;
        [SerializeField] private float maxY = 3.8f;

        [Header("Pool Size")]
        [SerializeField] private int poolSize = 12;

        private List<Obstacle> pool = new List<Obstacle>();
        private float spawnTimer = 0f;
        private float currentSpawnInterval = 2.5f;

        private void Awake()
        {
            InitializePool();
        }

        private void InitializePool()
        {
            for (int i = 0; i < poolSize; i++)
            {
                GameObject obj;
                if (obstaclePrefab != null)
                {
                    obj = Instantiate(obstaclePrefab, transform);
                }
                else
                {
                    obj = new GameObject($"Obstacle_{i}");
                    obj.transform.SetParent(transform);
                    obj.tag = "Obstacle";
                    obj.AddComponent<SpriteRenderer>();
                    CircleCollider2D col = obj.AddComponent<CircleCollider2D>();
                    col.isTrigger = true;
                    col.radius = 0.5f;
                    obj.AddComponent<Obstacle>();
                }
                obj.SetActive(false);
                pool.Add(obj.GetComponent<Obstacle>());
            }
        }

        public void ResetSpawner(float interval)
        {
            currentSpawnInterval = interval;
            spawnTimer = 1.0f; // Small initial delay before first obstacle
            foreach (var obs in pool)
            {
                if (obs != null) obs.Deactivate();
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
                SpawnObstacle();
                // Ramp spawn rate slightly as coins are collected
                float speedBonus = GameManager.Instance.CoinsCollectedInLevel * 0.05f;
                spawnTimer = Mathf.Max(1.2f, currentSpawnInterval - speedBonus);
            }
        }

        private void SpawnObstacle()
        {
            Obstacle obs = GetPooledObstacle();
            if (obs == null) return;

            float yPos = Random.Range(minY, maxY);
            obs.transform.position = new Vector3(spawnX, yPos, 0f);

            float baseSpeed = GameManager.Instance.CurrentLevelSpeed;
            Sprite spriteToUse = (obstacleSprites != null && obstacleSprites.Length > 0)
                ? obstacleSprites[Random.Range(0, obstacleSprites.Length)]
                : null;

            obs.Initialize(baseSpeed * 1.05f, spriteToUse);
        }

        private Obstacle GetPooledObstacle()
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

using System.Collections.Generic;
using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Spawns Question Coins ahead of the player using object pooling.
    /// </summary>
    public class CoinSpawner : MonoBehaviour
    {
        [Header("Prefab & Sprites")]
        [SerializeField] private GameObject coinPrefab;

        [Header("Spawn Bounds")]
        [SerializeField] private float spawnX = 11.5f;
        [SerializeField] private float minY = -3.5f;
        [SerializeField] private float maxY = 3.5f;

        [Header("Pool Size")]
        [SerializeField] private int poolSize = 6;

        private List<Coin> pool = new List<Coin>();
        private float spawnTimer = 0f;
        private float currentSpawnInterval = 3.2f;

        private void Awake()
        {
            InitializePool();
        }

        private void InitializePool()
        {
            for (int i = 0; i < poolSize; i++)
            {
                GameObject obj;
                if (coinPrefab != null)
                {
                    obj = Instantiate(coinPrefab, transform);
                }
                else
                {
                    obj = new GameObject($"Coin_{i}");
                    obj.transform.SetParent(transform);
                    obj.tag = "Coin";
                    obj.AddComponent<SpriteRenderer>();
                    CircleCollider2D col = obj.AddComponent<CircleCollider2D>();
                    col.isTrigger = true;
                    col.radius = 0.45f;
                    obj.AddComponent<Coin>();
                }
                obj.SetActive(false);
                pool.Add(obj.GetComponent<Coin>());
            }
        }

        public void ResetSpawner(float interval)
        {
            currentSpawnInterval = interval;
            spawnTimer = 1.8f; // Delay before first coin
            foreach (var coin in pool)
            {
                if (coin != null) coin.Deactivate();
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
                SpawnCoin();
                spawnTimer = currentSpawnInterval;
            }
        }

        private void SpawnCoin()
        {
            Coin coin = GetPooledCoin();
            if (coin == null) return;

            float yPos = Random.Range(minY, maxY);
            coin.transform.position = new Vector3(spawnX, yPos, 0f);

            float speed = GameManager.Instance.CurrentLevelSpeed;
            coin.Initialize(speed);
        }

        private Coin GetPooledCoin()
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

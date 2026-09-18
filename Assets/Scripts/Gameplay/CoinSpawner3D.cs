using System.Collections.Generic;
using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Spawns 3D Question Coins in safe corridors ahead of the player using object pooling.
    /// </summary>
    public class CoinSpawner3D : MonoBehaviour
    {
        [Header("Prefab")]
        [SerializeField] private GameObject coin3DPrefab;

        [Header("Spawn Volume")]
        [SerializeField] private float spawnZ = -280.0f;
        [SerializeField] private float minX = -12.0f;
        [SerializeField] private float maxX = 12.0f;
        [SerializeField] private float minY = -5.0f;
        [SerializeField] private float maxY = 7.0f;

        [Header("Pool Size")]
        [SerializeField] private int poolSize = 6;

        private List<Coin3D> pool = new List<Coin3D>();
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
                if (coin3DPrefab != null)
                {
                    obj = Instantiate(coin3DPrefab, transform);
                }
                else
                {
                    obj = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                    obj.name = $"Coin3D_{i}";
                    obj.transform.SetParent(transform);
                    obj.transform.localScale = new Vector3(1.4f, 0.2f, 1.4f);
                    obj.transform.rotation = Quaternion.Euler(90f, 0f, 0f);
                    obj.tag = "Coin";
                    CapsuleCollider col = obj.GetComponent<CapsuleCollider>();
                    if (col != null) col.isTrigger = true;
                    obj.AddComponent<Coin3D>();
                }
                obj.SetActive(false);
                pool.Add(obj.GetComponent<Coin3D>());
            }
        }

        public void ResetSpawner3D(float interval)
        {
            currentSpawnInterval = interval;
            spawnTimer = 1.6f;
            foreach (var coin in pool)
            {
                if (coin != null) coin.Deactivate3D();
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
                Spawn3DCoin();
                spawnTimer = currentSpawnInterval;
            }
        }

        private void Spawn3DCoin()
        {
            Coin3D coin = GetPooledCoin();
            if (coin == null) return;

            float x = Random.Range(minX, maxX);
            float y = Random.Range(minY, maxY);
            coin.transform.position = new Vector3(x, y, spawnZ);

            float speed = GameManager.Instance.CurrentLevelSpeed * 6.5f;
            coin.Initialize3D(speed);
        }

        private Coin3D GetPooledCoin()
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

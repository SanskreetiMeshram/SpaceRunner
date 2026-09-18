using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Generates a 3D hyperspace warp starfield with forward depth streaks and dynamic level theme fog.
    /// </summary>
    public class SpaceWarpTunnel3D : MonoBehaviour
    {
        [Header("Starfield Settings")]
        [SerializeField] private int starCount = 1200;
        [SerializeField] private float starFieldRadius = 40.0f;
        [SerializeField] private float starFieldDepth = 350.0f;
        [SerializeField] private ParticleSystem warpParticleSystem;

        private ParticleSystem.Particle[] particles;

        private void Start()
        {
            InitializeWarpStars();
        }

        private void InitializeWarpStars()
        {
            if (warpParticleSystem == null) warpParticleSystem = GetComponent<ParticleSystem>();
            if (warpParticleSystem == null) warpParticleSystem = gameObject.AddComponent<ParticleSystem>();

            var main = warpParticleSystem.main;
            main.maxParticles = starCount;
            main.simulationSpace = ParticleSystemSimulationSpace.World;
            main.startLifetime = Mathf.Infinity;
            main.startSpeed = 0f;
            main.startSize = 0.35f;

            var emission = warpParticleSystem.emission;
            emission.enabled = false;

            particles = new ParticleSystem.Particle[starCount];

            for (int i = 0; i < starCount; i++)
            {
                particles[i].position = new Vector3(
                    Random.Range(-starFieldRadius, starFieldRadius),
                    Random.Range(-starFieldRadius * 0.6f, starFieldRadius * 0.6f),
                    Random.Range(-starFieldDepth, 20.0f)
                );
                particles[i].startSize = Random.Range(0.2f, 0.55f);
                particles[i].startColor = Color.white;
            }

            warpParticleSystem.SetParticles(particles, starCount);
        }

        private void Update()
        {
            if (particles == null || GameManager.Instance == null) return;

            float speedMultiplier = (GameManager.Instance.CurrentState == GameState.Playing) ? 1.0f : 0.2f;
            float flightSpeed = GameManager.Instance.CurrentLevelSpeed * 22f * speedMultiplier;
            float dt = Time.deltaTime;

            int count = warpParticleSystem.GetParticles(particles);
            for (int i = 0; i < count; i++)
            {
                Vector3 p = particles[i].position;
                p.z += flightSpeed * dt;

                // Wrap around back to the deep distance
                if (p.z > 25.0f)
                {
                    p.z = -starFieldDepth;
                    p.x = Random.Range(-starFieldRadius, starFieldRadius);
                    p.y = Random.Range(-starFieldRadius * 0.6f, starFieldRadius * 0.6f);
                }

                particles[i].position = p;
            }

            warpParticleSystem.SetParticles(particles, count);
        }

        public void ApplyThemeFog(Color fogColor)
        {
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.ExponentialSquared;
            RenderSettings.fogDensity = 0.004f;
            RenderSettings.fogColor = fogColor;
            if (Camera.main != null) Camera.main.backgroundColor = fogColor;
        }
    }
}

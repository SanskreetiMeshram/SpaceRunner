using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.Gameplay
{
    /// <summary>
    /// Creates a 2D parallax space background that scrolls infinitely and tints dynamically
    /// based on the active level theme.
    /// </summary>
    public class BackgroundScroller : MonoBehaviour
    {
        [Header("Scroll Layers")]
        [SerializeField] private Transform nebulaLayer;
        [SerializeField] private Transform starsLayer;
        [SerializeField] private Transform dustLayer;

        [Header("Parallax Speeds")]
        [SerializeField] private float nebulaSpeedFactor = 0.2f;
        [SerializeField] private float starsSpeedFactor = 0.5f;
        [SerializeField] private float dustSpeedFactor = 0.85f;

        [Header("Repeat Width")]
        [SerializeField] private float repeatWidth = 20.48f;

        [Header("Renderers for Dynamic Tinting")]
        [SerializeField] private SpriteRenderer[] nebulaRenderers;
        [SerializeField] private SpriteRenderer[] starsRenderers;

        private void Update()
        {
            if (GameManager.Instance == null || GameManager.Instance.CurrentState != GameState.Playing)
            {
                return;
            }

            float baseSpeed = GameManager.Instance.CurrentLevelSpeed;
            float dt = Time.deltaTime;

            ScrollLayer(nebulaLayer, baseSpeed * nebulaSpeedFactor * dt);
            ScrollLayer(starsLayer, baseSpeed * starsSpeedFactor * dt);
            ScrollLayer(dustLayer, baseSpeed * dustSpeedFactor * dt);
        }

        private void ScrollLayer(Transform layer, float deltaX)
        {
            if (layer == null) return;

            layer.position += Vector3.left * deltaX;

            // Seamless wrap-around
            if (layer.position.x <= -repeatWidth)
            {
                layer.position += Vector3.right * repeatWidth;
            }
        }

        public void ApplyThemeColors(Color primaryColor, Color secondaryColor)
        {
            if (nebulaRenderers != null)
            {
                foreach (var r in nebulaRenderers)
                {
                    if (r != null) r.color = primaryColor;
                }
            }

            if (starsRenderers != null)
            {
                foreach (var r in starsRenderers)
                {
                    if (r != null) r.color = secondaryColor;
                }
            }

            if (Camera.main != null)
            {
                Camera.main.backgroundColor = Color.Lerp(Color.black, secondaryColor, 0.25f);
            }
        }
    }
}

using UnityEngine;
using UnityEngine.UI;
using SpaceGame.Managers;
using SpaceGame.Gameplay;

namespace SpaceGame.UI
{
    /// <summary>
    /// Displays in-game HUD: score, coins, heart lives, class name, dash cooldown, and progress bar.
    /// Supports both standard UnityEngine.UI.Text and TextMeshPro text.
    /// </summary>
    public class HUDController : MonoBehaviour
    {
        [Header("Text Displays")]
        [SerializeField] private Text scoreText;
        [SerializeField] private Text coinText;
        [SerializeField] private Text levelTitleText;

        [Header("Lives (Hearts)")]
        [SerializeField] private Image[] heartImages;
        [SerializeField] private Sprite heartFullSprite;
        [SerializeField] private Sprite heartEmptySprite;

        [Header("Gauges & Bars")]
        [SerializeField] private Image dashCooldownBar;
        [SerializeField] private Image levelProgressBar;

        [Header("References")]
        [SerializeField] private PlayerController playerController;

        private void OnEnable()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.OnScoreChanged += UpdateScore;
                GameManager.Instance.OnLivesChanged += UpdateLives;
                GameManager.Instance.OnCoinsChanged += UpdateCoins;

                UpdateScore(GameManager.Instance.CurrentScore);
                UpdateLives(GameManager.Instance.CurrentLives);
                UpdateCoins(GameManager.Instance.CoinsCollectedInLevel);

                if (levelTitleText != null && GameManager.Instance.CurrentConfig != null)
                {
                    levelTitleText.text = $"{GameManager.Instance.CurrentConfig.className} • {GameManager.Instance.CurrentConfig.zoneName}";
                }
            }
        }

        private void OnDisable()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.OnScoreChanged -= UpdateScore;
                GameManager.Instance.OnLivesChanged -= UpdateLives;
                GameManager.Instance.OnCoinsChanged -= UpdateCoins;
            }
        }

        private void Update()
        {
            // Update Dash cooldown indicator
            if (dashCooldownBar != null && playerController != null)
            {
                // 1.0 = ready, 0.0 = on cooldown
                dashCooldownBar.fillAmount = 1f - playerController.DashCooldownRatio;
            }
        }

        public void UpdateScore(int score)
        {
            if (scoreText != null)
            {
                scoreText.text = $"★ {score}";
            }
        }

        public void UpdateCoins(int coins)
        {
            if (coinText != null)
            {
                int target = (GameManager.Instance != null) ? GameManager.Instance.TargetCoins : 5;
                coinText.text = $"🪙 {coins} / {target}";
            }

            if (levelProgressBar != null && GameManager.Instance != null)
            {
                float ratio = (float)coins / Mathf.Max(1, GameManager.Instance.TargetCoins);
                levelProgressBar.fillAmount = Mathf.Clamp01(ratio);
            }
        }

        public void UpdateLives(int lives)
        {
            if (heartImages == null) return;

            for (int i = 0; i < heartImages.Length; i++)
            {
                if (heartImages[i] != null)
                {
                    bool isAlive = i < lives;
                    if (heartFullSprite != null && heartEmptySprite != null)
                    {
                        heartImages[i].sprite = isAlive ? heartFullSprite : heartEmptySprite;
                    }
                    else
                    {
                        heartImages[i].color = isAlive ? Color.red : new Color(0.4f, 0.4f, 0.4f, 0.4f);
                    }
                }
            }
        }
    }
}

using System.Text;
using UnityEngine;
using UnityEngine.UI;
using SpaceGame.Data;
using SpaceGame.Managers;

namespace SpaceGame.UI
{
    /// <summary>
    /// Level completion modal celebrating grade progression, 1-3 star rating,
    /// score totals, and per-subject educational accuracy breakdown.
    /// </summary>
    public class LevelCompleteUI : MonoBehaviour
    {
        [Header("Header Text")]
        [SerializeField] private Text levelTitleText;
        [SerializeField] private Text celebrationSubtitleText;

        [Header("Stars")]
        [SerializeField] private Image[] starImages;
        [SerializeField] private Sprite starFilledSprite;
        [SerializeField] private Sprite starEmptySprite;

        [Header("Stats")]
        [SerializeField] private Text finalScoreText;
        [SerializeField] private Text finalCoinsText;

        [Header("Subject Accuracy Report")]
        [SerializeField] private Text subjectAccuracyReportText;

        [Header("Action Buttons")]
        [SerializeField] private Button nextLevelButton;
        [SerializeField] private Button replayButton;
        [SerializeField] private Button returnToMapButton;

        private void Awake()
        {
            if (nextLevelButton != null) nextLevelButton.onClick.AddListener(OnNextLevelClicked);
            if (replayButton != null) replayButton.onClick.AddListener(OnReplayClicked);
            if (returnToMapButton != null) returnToMapButton.onClick.AddListener(OnReturnToMapClicked);
        }

        public void ShowSummary()
        {
            if (GameManager.Instance == null) return;

            int levelNum = GameManager.Instance.CurrentLevelNumber;
            LevelConfig config = GameManager.Instance.CurrentConfig;
            int stars = ProgressTracker.GetStars(levelNum);

            if (levelTitleText != null)
            {
                levelTitleText.text = $"{config.className} Cleared! 🎓";
            }

            if (celebrationSubtitleText != null)
            {
                celebrationSubtitleText.text = $"Fantastic job mastering {config.zoneName}!";
            }

            if (finalScoreText != null)
            {
                finalScoreText.text = $"Score: {GameManager.Instance.CurrentScore}";
            }

            if (finalCoinsText != null)
            {
                finalCoinsText.text = $"Coins Collected: {GameManager.Instance.CoinsCollectedInLevel}";
            }

            // Reveal Stars
            if (starImages != null)
            {
                for (int i = 0; i < starImages.Length; i++)
                {
                    if (starImages[i] != null)
                    {
                        bool earned = i < stars;
                        if (starFilledSprite != null && starEmptySprite != null)
                        {
                            starImages[i].sprite = earned ? starFilledSprite : starEmptySprite;
                        }
                        else
                        {
                            starImages[i].color = earned ? new Color(1f, 0.85f, 0.2f) : new Color(0.35f, 0.35f, 0.35f, 0.5f);
                        }
                    }
                }
            }

            // Build Per-Subject Accuracy Report
            if (subjectAccuracyReportText != null)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine("📊 Subject Accuracy Report:");
                sb.AppendLine("───────────────────────────");

                var metrics = ProgressTracker.Data.subjectMetrics;
                if (metrics != null && metrics.Count > 0)
                {
                    foreach (var m in metrics)
                    {
                        if (m.totalAttempts > 0)
                        {
                            sb.AppendLine($"{m.subject}: {m.AccuracyPercentage:F0}% ({m.correctAnswers}/{m.totalAttempts} correct)");
                        }
                    }
                }
                else
                {
                    sb.AppendLine("All questions answered with high accuracy!");
                }

                subjectAccuracyReportText.text = sb.ToString();
            }

            // Disable Next Level button if at final class 10
            if (nextLevelButton != null)
            {
                nextLevelButton.gameObject.SetActive(levelNum < 10);
            }
        }

        private void OnNextLevelClicked()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.AdvanceToNextLevel();
            }
        }

        private void OnReplayClicked()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.RetryCurrentLevel();
            }
        }

        private void OnReturnToMapClicked()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.ReturnToLevelMap();
            }
        }
    }
}

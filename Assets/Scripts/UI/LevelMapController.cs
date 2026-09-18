using System;
using UnityEngine;
using UnityEngine.UI;
using SpaceGame.Data;
using SpaceGame.Managers;

namespace SpaceGame.UI
{
    [Serializable]
    public class LevelMapNode
    {
        public int levelNumber;
        public Button nodeButton;
        public Image planetImage;
        public Text gradeText;
        public Text subjectText;
        public GameObject lockOverlay;
        public Image[] starIcons; // 3 stars
    }

    /// <summary>
    /// Controls the Level Map screen, showing a cosmic trail of 10 planet nodes (Classes 1 to 10),
    /// their lock states, and earned star ratings.
    /// </summary>
    public class LevelMapController : MonoBehaviour
    {
        [Header("Level Nodes (1 to 10)")]
        [SerializeField] private LevelMapNode[] nodes;

        [Header("Star Sprites")]
        [SerializeField] private Sprite starFilledSprite;
        [SerializeField] private Sprite starEmptySprite;

        [Header("Color Palettes")]
        [SerializeField] private Color lockedColor = new Color(0.4f, 0.4f, 0.45f, 0.6f);

        private void Start()
        {
            SetupNodeListeners();
            RefreshMap();
        }

        private void SetupNodeListeners()
        {
            if (nodes == null) return;

            for (int i = 0; i < nodes.Length; i++)
            {
                int levelNum = i + 1;
                LevelMapNode node = nodes[i];
                if (node != null && node.nodeButton != null)
                {
                    node.nodeButton.onClick.RemoveAllListeners();
                    node.nodeButton.onClick.AddListener(() => OnNodeClicked(levelNum));
                }
            }
        }

        public void RefreshMap()
        {
            if (nodes == null) return;

            for (int i = 0; i < nodes.Length; i++)
            {
                int levelNum = i + 1;
                LevelMapNode node = nodes[i];
                if (node == null) continue;

                LevelConfig config = LevelConfig.GetConfigForLevel(levelNum);
                bool isUnlocked = ProgressTracker.IsLevelUnlocked(levelNum);
                int stars = ProgressTracker.GetStars(levelNum);

                if (node.gradeText != null) node.gradeText.text = config.className;
                if (node.subjectText != null) node.subjectText.text = config.subjectsSummary;

                if (node.planetImage != null)
                {
                    node.planetImage.color = isUnlocked ? config.primaryColor : lockedColor;
                }

                if (node.lockOverlay != null)
                {
                    node.lockOverlay.SetActive(!isUnlocked);
                }

                if (node.nodeButton != null)
                {
                    node.nodeButton.interactable = isUnlocked;
                }

                // Update stars
                if (node.starIcons != null)
                {
                    for (int s = 0; s < node.starIcons.Length; s++)
                    {
                        if (node.starIcons[s] != null)
                        {
                            bool hasStar = (s < stars);
                            if (starFilledSprite != null && starEmptySprite != null)
                            {
                                node.starIcons[s].sprite = hasStar ? starFilledSprite : starEmptySprite;
                            }
                            else
                            {
                                node.starIcons[s].color = hasStar ? new Color(1f, 0.85f, 0.2f) : new Color(0.3f, 0.3f, 0.3f, 0.4f);
                            }
                        }
                    }
                }
            }
        }

        private void OnNodeClicked(int levelNumber)
        {
            if (!ProgressTracker.IsLevelUnlocked(levelNumber))
            {
                return;
            }

            if (AudioManager.Instance != null) AudioManager.Instance.PlayCoin();
            if (GameManager.Instance != null)
            {
                GameManager.Instance.StartLevel(levelNumber);
            }
        }
    }
}

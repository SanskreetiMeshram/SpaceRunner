using UnityEngine;
using SpaceGame.Managers;

namespace SpaceGame.UI
{
    /// <summary>
    /// Coordinates all UI panels, switching active panels based on the GameManager's state.
    /// </summary>
    public class UIManager : MonoBehaviour
    {
        [Header("Panels")]
        [SerializeField] private GameObject levelMapPanel;
        [SerializeField] private GameObject hudPanel;
        [SerializeField] private GameObject questionPanel;
        [SerializeField] private GameObject learnModePanel;
        [SerializeField] private GameObject levelCompletePanel;
        [SerializeField] private GameObject gameOverPanel;
        [SerializeField] private GameObject skinSelectPanel;

        [Header("Controllers")]
        [SerializeField] private LevelMapController levelMapController;
        [SerializeField] private HUDController hudController;
        [SerializeField] private QuestionPanelUI questionPanelUI;
        [SerializeField] private LearnModeUI learnModeUI;
        [SerializeField] private LevelCompleteUI levelCompleteUI;

        public void UpdateStateUI(GameState state)
        {
            // Deactivate all panels initially
            if (levelMapPanel != null) levelMapPanel.SetActive(false);
            if (hudPanel != null) hudPanel.SetActive(false);
            if (questionPanel != null) questionPanel.SetActive(false);
            if (learnModePanel != null) learnModePanel.SetActive(false);
            if (levelCompletePanel != null) levelCompletePanel.SetActive(false);
            if (gameOverPanel != null) gameOverPanel.SetActive(false);
            if (skinSelectPanel != null) skinSelectPanel.SetActive(false);

            switch (state)
            {
                case GameState.LevelMap:
                    if (levelMapPanel != null) levelMapPanel.SetActive(true);
                    if (levelMapController != null) levelMapController.RefreshMap();
                    break;

                case GameState.Playing:
                    if (hudPanel != null) hudPanel.SetActive(true);
                    break;

                case GameState.QuestionPause:
                    if (hudPanel != null) hudPanel.SetActive(true);
                    if (questionPanel != null) questionPanel.SetActive(true);
                    break;

                case GameState.LearnMode:
                    if (learnModePanel != null) learnModePanel.SetActive(true);
                    break;

                case GameState.LevelComplete:
                    if (levelCompletePanel != null) levelCompletePanel.SetActive(true);
                    if (levelCompleteUI != null) levelCompleteUI.ShowSummary();
                    break;

                case GameState.GameOver:
                    if (gameOverPanel != null) gameOverPanel.SetActive(true);
                    break;
            }
        }

        public void OpenSkinSelect()
        {
            if (skinSelectPanel != null) skinSelectPanel.SetActive(true);
        }

        public void CloseSkinSelect()
        {
            if (skinSelectPanel != null) skinSelectPanel.SetActive(false);
        }
    }
}

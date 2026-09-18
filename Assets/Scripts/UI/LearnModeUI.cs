using System.Text;
using UnityEngine;
using UnityEngine.UI;
using SpaceGame.Data;
using SpaceGame.Managers;

namespace SpaceGame.UI
{
    /// <summary>
    /// The heart of the educational experience: a warm, non-punishing screen that breaks down
    /// incorrect answers step-by-step with curriculum clarity, mascot encouragement, and retry options.
    /// </summary>
    public class LearnModeUI : MonoBehaviour
    {
        [Header("Header Elements")]
        [SerializeField] private Text titleText;
        [SerializeField] private Text originalQuestionText;

        [Header("Answer Comparison Panels")]
        [SerializeField] private Text playerAnswerText;
        [SerializeField] private Text correctAnswerText;
        [SerializeField] private Image playerAnswerBox;
        [SerializeField] private Image correctAnswerBox;

        [Header("Solution Steps Breakdown")]
        [SerializeField] private Text solutionStepsContainerText;

        [Header("Mascot & Encouragement")]
        [SerializeField] private Image mascotImage;
        [SerializeField] private Text mascotEncouragementText;
        [SerializeField] private Sprite mascotEncouragingSprite;

        [Header("Action Buttons")]
        [SerializeField] private Button tryAgainButton;      // Re-tries same question
        [SerializeField] private Button continueFlightButton;  // Resumes runner
        [SerializeField] private Button returnToMapButton;     // Goes back to level map

        [Header("References")]
        [SerializeField] private QuestionManager questionManager;

        private QuestionItem activeQuestion;

        private void Awake()
        {
            if (tryAgainButton != null) tryAgainButton.onClick.AddListener(OnTryAgainClicked);
            if (continueFlightButton != null) continueFlightButton.onClick.AddListener(OnContinueFlightClicked);
            if (returnToMapButton != null) returnToMapButton.onClick.AddListener(OnReturnToMapClicked);
        }

        public void DisplayLearnMode(QuestionItem question, int chosenOptionIndex)
        {
            activeQuestion = question;

            if (titleText != null)
            {
                titleText.text = "Not quite — let's learn this together! ✨";
            }

            if (originalQuestionText != null)
            {
                originalQuestionText.text = $"{question.GetSubjectEmoji()} {question.questionText}";
            }

            // Display Chosen vs Correct Options
            string chosenText = (chosenOptionIndex >= 0 && chosenOptionIndex < question.options.Length)
                ? question.options[chosenOptionIndex]
                : "None selected";
            string correctText = (question.correctIndex >= 0 && question.correctIndex < question.options.Length)
                ? question.options[question.correctIndex]
                : "Unknown";

            if (playerAnswerText != null)
            {
                playerAnswerText.text = $"Your Answer:  {chosenText}";
            }

            if (correctAnswerText != null)
            {
                correctAnswerText.text = $"Correct Answer:  {correctText}  ✓";
            }

            if (playerAnswerBox != null)
            {
                playerAnswerBox.color = new Color(0.98f, 0.50f, 0.50f, 0.25f); // Soft red highlight
            }

            if (correctAnswerBox != null)
            {
                correctAnswerBox.color = new Color(0.40f, 0.90f, 0.50f, 0.25f); // Emerald green highlight
            }

            // Construct Step-by-Step Numbered Solution
            if (solutionStepsContainerText != null)
            {
                StringBuilder sb = new StringBuilder();
                string emoji = question.GetSubjectEmoji();

                if (question.solutionSteps != null && question.solutionSteps.Length > 0)
                {
                    for (int i = 0; i < question.solutionSteps.Length; i++)
                    {
                        sb.AppendLine($"{emoji} Step {i + 1}:  {question.solutionSteps[i]}");
                        if (i < question.solutionSteps.Length - 1) sb.AppendLine();
                    }
                }
                else
                {
                    sb.AppendLine($"{emoji} The correct answer is: {correctText}");
                }

                solutionStepsContainerText.text = sb.ToString();
            }

            // Encouragement message & mascot
            if (mascotEncouragementText != null)
            {
                mascotEncouragementText.text = "Great try! Now you know it — let's keep flying! 🚀";
            }

            if (mascotImage != null && mascotEncouragingSprite != null)
            {
                mascotImage.sprite = mascotEncouragingSprite;
            }
        }

        private void OnTryAgainClicked()
        {
            if (questionManager != null)
            {
                questionManager.RetryCurrentQuestion();
            }
        }

        private void OnContinueFlightClicked()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.ResumeFromLearnMode();
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

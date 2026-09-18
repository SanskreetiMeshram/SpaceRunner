using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using SpaceGame.Data;
using SpaceGame.Managers;

namespace SpaceGame.UI
{
    /// <summary>
    /// Interactive quiz card presented when the UFO touches a question coin.
    /// Displays the question, subject icon badge, 4 colorful pastel answer buttons, and mascot reactions.
    /// </summary>
    public class QuestionPanelUI : MonoBehaviour
    {
        [Header("Question Header")]
        [SerializeField] private Text subjectBadgeText;
        [SerializeField] private Text topicText;
        [SerializeField] private Text questionBodyText;

        [Header("Answer Option Buttons")]
        [SerializeField] private Button[] optionButtons; // 4 buttons
        [SerializeField] private Text[] optionTexts;
        [SerializeField] private Image[] optionBackgrounds;

        [Header("Pastel Colors for Buttons")]
        [SerializeField] private Color[] pastelColors = new Color[]
        {
            new Color(0.98f, 0.85f, 0.82f), // Soft peach
            new Color(0.85f, 0.92f, 0.98f), // Soft sky blue
            new Color(0.86f, 0.95f, 0.88f), // Soft mint green
            new Color(0.95f, 0.88f, 0.98f)  // Soft lavender
        };

        [Header("Mascot")]
        [SerializeField] private Image mascotImage;
        [SerializeField] private Text mascotSpeechText;
        [SerializeField] private Sprite mascotThinkingSprite;
        [SerializeField] private Sprite mascotHappySprite;

        [Header("Hint")]
        [SerializeField] private Button hintButton;
        [SerializeField] private Text hintText;

        [Header("Manager Reference")]
        [SerializeField] private QuestionManager questionManager;

        private QuestionItem currentQuestion;
        private bool isAnsweringLocked = false;

        private void Awake()
        {
            SetupOptionListeners();
            if (hintButton != null)
            {
                hintButton.onClick.AddListener(ToggleHint);
            }
        }

        private void SetupOptionListeners()
        {
            if (optionButtons == null) return;

            for (int i = 0; i < optionButtons.Length; i++)
            {
                int index = i;
                optionButtons[i].onClick.AddListener(() => OnOptionSelected(index));
            }
        }

        public void DisplayQuestion(QuestionItem question)
        {
            currentQuestion = question;
            isAnsweringLocked = false;

            if (hintText != null)
            {
                hintText.gameObject.SetActive(false);
                hintText.text = question.hint;
            }

            if (subjectBadgeText != null)
            {
                subjectBadgeText.text = $"{question.GetSubjectEmoji()} {question.subject.ToUpper()}";
            }

            if (topicText != null)
            {
                topicText.text = $"Topic: {question.topic}";
            }

            if (questionBodyText != null)
            {
                questionBodyText.text = question.questionText;
            }

            // Populate option texts and restore pastel colors
            for (int i = 0; i < optionButtons.Length; i++)
            {
                if (i < question.options.Length)
                {
                    optionButtons[i].gameObject.SetActive(true);
                    optionButtons[i].interactable = true;

                    if (optionTexts != null && i < optionTexts.Length)
                    {
                        char optionLetter = (char)('A' + i);
                        optionTexts[i].text = $"{optionLetter}.  {question.options[i]}";
                    }

                    if (optionBackgrounds != null && i < optionBackgrounds.Length)
                    {
                        optionBackgrounds[i].color = (i < pastelColors.Length) ? pastelColors[i] : Color.white;
                    }
                }
                else
                {
                    optionButtons[i].gameObject.SetActive(false);
                }
            }

            // Set mascot reaction to friendly listening
            if (mascotSpeechText != null)
            {
                mascotSpeechText.text = "You can do it! Pick the answer that fits best.";
            }

            if (mascotImage != null && mascotThinkingSprite != null)
            {
                mascotImage.sprite = mascotThinkingSprite;
            }
        }

        private void OnOptionSelected(int index)
        {
            if (isAnsweringLocked || currentQuestion == null) return;
            isAnsweringLocked = true;

            // Submit answer to question manager
            if (questionManager != null)
            {
                questionManager.SubmitAnswer(index);
            }
        }

        public void ShowAnswerFeedback(int selectedIndex, bool isCorrect, Action onComplete)
        {
            StartCoroutine(AnimateAnswerFeedback(selectedIndex, isCorrect, onComplete));
        }

        private IEnumerator AnimateAnswerFeedback(int selectedIndex, bool isCorrect, Action onComplete)
        {
            // Flash selected option
            if (optionBackgrounds != null && selectedIndex < optionBackgrounds.Length)
            {
                optionBackgrounds[selectedIndex].color = isCorrect
                    ? new Color(0.4f, 0.9f, 0.45f) // Emerald green
                    : new Color(0.95f, 0.45f, 0.45f); // Soft crimson
            }

            // Mascot reaction
            if (isCorrect)
            {
                if (mascotSpeechText != null) mascotSpeechText.text = "Super star! That's completely right!";
                if (mascotImage != null && mascotHappySprite != null) mascotImage.sprite = mascotHappySprite;
            }
            else
            {
                if (mascotSpeechText != null) mascotSpeechText.text = "Oops! No worries, let's learn how to solve this!";
            }

            // Short pause for visual confirmation before continuing or opening Learn Mode
            yield return new WaitForSecondsRealtime(0.65f);

            onComplete?.Invoke();
        }

        private void ToggleHint()
        {
            if (hintText != null && currentQuestion != null && !string.IsNullOrEmpty(currentQuestion.hint))
            {
                hintText.gameObject.SetActive(!hintText.gameObject.activeSelf);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using UnityEngine;
using SpaceGame.Data;
using SpaceGame.UI;

namespace SpaceGame.Managers
{
    /// <summary>
    /// Loads curriculum question banks from Resources, manages the unplayed question queue,
    /// validates player answers, and coordinates with QuestionPanelUI and LearnModeUI.
    /// </summary>
    public class QuestionManager : MonoBehaviour
    {
        [SerializeField] private QuestionPanelUI questionPanelUI;
        [SerializeField] private LearnModeUI learnModeUI;

        private QuestionBank currentBank;
        private List<QuestionItem> questionQueue = new List<QuestionItem>();
        private QuestionItem currentQuestion;

        public QuestionItem CurrentQuestion => currentQuestion;

        public void LoadLevelQuestionBank(int levelNumber)
        {
            string resourcePath = $"QuestionBanks/level_{levelNumber}";
            TextAsset jsonAsset = Resources.Load<TextAsset>(resourcePath);

            if (jsonAsset != null)
            {
                currentBank = QuestionBank.FromJson(jsonAsset.text);
                ShuffleAndQueueQuestions();
                Debug.Log($"Loaded Question Bank for Level {levelNumber} with {currentBank.questions.Count} questions.");
            }
            else
            {
                Debug.LogError($"Failed to load Question Bank at Resources/{resourcePath}!");
                // Fallback mock question if resource not found
                currentBank = CreateFallbackBank(levelNumber);
                ShuffleAndQueueQuestions();
            }
        }

        private void ShuffleAndQueueQuestions()
        {
            questionQueue.Clear();
            if (currentBank == null || currentBank.questions == null) return;

            List<QuestionItem> pool = new List<QuestionItem>(currentBank.questions);
            // Fisher-Yates shuffle
            for (int i = pool.Count - 1; i > 0; i--)
            {
                int r = UnityEngine.Random.Range(0, i + 1);
                var temp = pool[i];
                pool[i] = pool[r];
                pool[r] = temp;
            }

            questionQueue.AddRange(pool);
        }

        public void PresentNextQuestion()
        {
            if (questionQueue.Count == 0)
            {
                // Reshuffle if queue runs out during long practice
                ShuffleAndQueueQuestions();
            }

            if (questionQueue.Count > 0)
            {
                currentQuestion = questionQueue[0];
                questionQueue.RemoveAt(0);

                if (questionPanelUI != null)
                {
                    questionPanelUI.DisplayQuestion(currentQuestion);
                }
            }
        }

        public void SubmitAnswer(int selectedOptionIndex)
        {
            if (currentQuestion == null) return;

            bool isCorrect = currentQuestion.IsAnswerCorrect(selectedOptionIndex);

            if (isCorrect)
            {
                if (questionPanelUI != null)
                {
                    questionPanelUI.ShowAnswerFeedback(selectedOptionIndex, true, () =>
                    {
                        GameManager.Instance.RegisterAnswerResult(true, currentQuestion.subject);
                    });
                }
                else
                {
                    GameManager.Instance.RegisterAnswerResult(true, currentQuestion.subject);
                }
            }
            else
            {
                if (questionPanelUI != null)
                {
                    questionPanelUI.ShowAnswerFeedback(selectedOptionIndex, false, () =>
                    {
                        // Open Learn Mode with detailed step-by-step breakdown
                        if (learnModeUI != null)
                        {
                            learnModeUI.DisplayLearnMode(currentQuestion, selectedOptionIndex);
                        }
                        GameManager.Instance.RegisterAnswerResult(false, currentQuestion.subject);
                    });
                }
                else
                {
                    if (learnModeUI != null)
                    {
                        learnModeUI.DisplayLearnMode(currentQuestion, selectedOptionIndex);
                    }
                    GameManager.Instance.RegisterAnswerResult(false, currentQuestion.subject);
                }
            }
        }

        public void RetryCurrentQuestion()
        {
            // Re-presents the exact same question so the child can try again with newfound understanding
            if (currentQuestion != null && questionPanelUI != null)
            {
                GameManager.Instance.SetState(GameState.QuestionPause);
                questionPanelUI.DisplayQuestion(currentQuestion);
            }
        }

        private QuestionBank CreateFallbackBank(int level)
        {
            return new QuestionBank
            {
                level = level,
                @class = level.ToString(),
                subject = "General",
                description = "Fallback Questions",
                questions = new List<QuestionItem>
                {
                    new QuestionItem
                    {
                        id = $"FB-001",
                        subject = "Math",
                        topic = "Basics",
                        difficulty = "easy",
                        questionText = "What is 2 + 2?",
                        type = "mcq",
                        options = new string[] { "3", "4", "5", "6" },
                        correctIndex = 1,
                        solutionSteps = new string[] { "Count 2 items.", "Add 2 more items.", "2 + 2 = 4!" },
                        hint = "Count on your fingers: 2, then 3, 4."
                    }
                }
            };
        }
    }
}

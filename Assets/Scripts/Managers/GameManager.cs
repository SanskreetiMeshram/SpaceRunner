using System;
using System.Collections.Generic;
using UnityEngine;
using SpaceGame.Data;
using SpaceGame.Gameplay;
using SpaceGame.UI;

namespace SpaceGame.Managers
{
    public enum GameState
    {
        MainMenu,
        LevelMap,
        Playing,
        QuestionPause,
        LearnMode,
        LevelComplete,
        GameOver
    }

    /// <summary>
    /// Master coordinator for Educational Edition, handling game states, level configs,
    /// scoring, lives, difficulty scaling, and progress evaluation.
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("State")]
        [SerializeField] private GameState currentState = GameState.LevelMap;
        public GameState CurrentState => currentState;

        [Header("Current Level")]
        [SerializeField] private int currentLevelNumber = 1;
        private LevelConfig currentLevelConfig;

        [Header("Gameplay Stats")]
        [SerializeField] private int currentScore = 0;
        [SerializeField] private int currentLives = 3;
        [SerializeField] private int coinsCollectedInLevel = 0;
        [SerializeField] private int correctAnswersInLevel = 0;
        [SerializeField] private int questionsAttemptedInLevel = 0;

        [Header("References")]
        [SerializeField] private PlayerController playerController;
        [SerializeField] private ObstacleSpawner obstacleSpawner;
        [SerializeField] private CoinSpawner coinSpawner;
        [SerializeField] private BackgroundScroller backgroundScroller;
        [SerializeField] private QuestionManager questionManager;
        [SerializeField] private UIManager uiManager;

        // Public getters
        public int CurrentLevelNumber => currentLevelNumber;
        public LevelConfig CurrentConfig => currentLevelConfig;
        public int CurrentScore => currentScore;
        public int CurrentLives => currentLives;
        public int CoinsCollectedInLevel => coinsCollectedInLevel;
        public int TargetCoins => (currentLevelConfig != null) ? currentLevelConfig.targetCoins : 5;
        public float CurrentLevelSpeed
        {
            get
            {
                if (currentLevelConfig == null) return 4.0f;
                // Ramp speed slightly as coins are collected
                return currentLevelConfig.baseRunnerSpeed + (coinsCollectedInLevel * 0.15f);
            }
        }

        public event Action<GameState> OnStateChanged;
        public event Action<int> OnScoreChanged;
        public event Action<int> OnLivesChanged;
        public event Action<int> OnCoinsChanged;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
                return;
            }

            ProgressTracker.LoadProgress();
        }

        private void Start()
        {
            SetState(GameState.LevelMap);
        }

        public void SetState(GameState newState)
        {
            currentState = newState;

            switch (currentState)
            {
                case GameState.Playing:
                    Time.timeScale = 1.0f;
                    break;
                case GameState.QuestionPause:
                case GameState.LearnMode:
                    Time.timeScale = 0.0f; // Pause game physics during quiz
                    break;
                default:
                    Time.timeScale = 1.0f;
                    break;
            }

            if (uiManager != null)
            {
                uiManager.UpdateStateUI(currentState);
            }

            OnStateChanged?.Invoke(currentState);
        }

        public void StartLevel(int levelNumber)
        {
            currentLevelNumber = Mathf.Clamp(levelNumber, 1, 10);
            currentLevelConfig = LevelConfig.GetConfigForLevel(currentLevelNumber);

            currentScore = 0;
            currentLives = 3;
            coinsCollectedInLevel = 0;
            correctAnswersInLevel = 0;
            questionsAttemptedInLevel = 0;

            OnScoreChanged?.Invoke(currentScore);
            OnLivesChanged?.Invoke(currentLives);
            OnCoinsChanged?.Invoke(coinsCollectedInLevel);

            if (backgroundScroller != null)
            {
                backgroundScroller.ApplyThemeColors(currentLevelConfig.primaryColor, currentLevelConfig.secondaryColor);
            }

            if (playerController != null)
            {
                playerController.ResetPlayerState();
            }

            if (obstacleSpawner != null)
            {
                obstacleSpawner.ResetSpawner(currentLevelConfig.obstacleSpawnRate);
            }

            if (coinSpawner != null)
            {
                coinSpawner.ResetSpawner(currentLevelConfig.coinSpawnRate);
            }

            if (questionManager != null)
            {
                questionManager.LoadLevelQuestionBank(currentLevelNumber);
            }

            if (AudioManager.Instance != null)
            {
                AudioManager.Instance.PlayBGM();
            }

            SetState(GameState.Playing);
        }

        public void TriggerQuestionEvent()
        {
            SetState(GameState.QuestionPause);

            if (questionManager != null)
            {
                questionManager.PresentNextQuestion();
            }
        }

        public void RegisterAnswerResult(bool isCorrect, string subject)
        {
            questionsAttemptedInLevel++;
            ProgressTracker.Data.RecordAnswer(subject, isCorrect);

            if (isCorrect)
            {
                correctAnswersInLevel++;
                currentScore += 10;
                coinsCollectedInLevel++;

                OnScoreChanged?.Invoke(currentScore);
                OnCoinsChanged?.Invoke(coinsCollectedInLevel);

                if (AudioManager.Instance != null) AudioManager.Instance.PlayCorrect();

                // Check if level win target achieved
                if (coinsCollectedInLevel >= TargetCoins)
                {
                    CompleteCurrentLevel();
                }
                else
                {
                    // Resume flight
                    SetState(GameState.Playing);
                }
            }
            else
            {
                if (AudioManager.Instance != null) AudioManager.Instance.PlayWrongSoft();
                // Switch to friendly "Let's Learn!" mode
                SetState(GameState.LearnMode);
            }
        }

        public void ResumeFromLearnMode()
        {
            // Player reviewed the step-by-step solution, now resumes the space flight!
            SetState(GameState.Playing);
        }

        public void LoseLife()
        {
            currentLives--;
            OnLivesChanged?.Invoke(currentLives);

            if (currentLives <= 0)
            {
                SetState(GameState.GameOver);
            }
        }

        private void CompleteCurrentLevel()
        {
            // Calculate 3-star rating
            // 3 stars: 100% accuracy and 3 lives
            // 2 stars: >= 70% accuracy
            // 1 star: finished with at least 1 life
            float accuracy = (questionsAttemptedInLevel > 0)
                ? ((float)correctAnswersInLevel / questionsAttemptedInLevel)
                : 1.0f;

            int stars = 1;
            if (accuracy >= 0.99f && currentLives == 3)
            {
                stars = 3;
            }
            else if (accuracy >= 0.65f)
            {
                stars = 2;
            }

            ProgressTracker.CompleteLevel(currentLevelNumber, currentScore, stars);

            if (AudioManager.Instance != null) AudioManager.Instance.PlayStar();

            SetState(GameState.LevelComplete);
        }

        public void ReturnToLevelMap()
        {
            SetState(GameState.LevelMap);
        }

        public void RetryCurrentLevel()
        {
            StartLevel(currentLevelNumber);
        }

        public void AdvanceToNextLevel()
        {
            if (currentLevelNumber < 10)
            {
                StartLevel(currentLevelNumber + 1);
            }
            else
            {
                ReturnToLevelMap();
            }
        }
    }
}

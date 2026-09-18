using System;
using UnityEngine;

namespace SpaceGame.Data
{
    /// <summary>
    /// Manages persistent save data for levels, stars, subject accuracy, and unlocked items.
    /// </summary>
    public static class ProgressTracker
    {
        private const string SAVE_KEY = "EducationalEdition_PlayerProgress";

        private static PlayerProgressData _cachedData;

        public static PlayerProgressData Data
        {
            get
            {
                if (_cachedData == null)
                {
                    LoadProgress();
                }
                return _cachedData;
            }
        }

        public static void LoadProgress()
        {
            if (PlayerPrefs.HasKey(SAVE_KEY))
            {
                try
                {
                    string json = PlayerPrefs.GetString(SAVE_KEY);
                    _cachedData = JsonUtility.FromJson<PlayerProgressData>(json);
                }
                catch (Exception ex)
                {
                    Debug.LogWarning($"Failed to deserialize progress, resetting: {ex.Message}");
                    _cachedData = new PlayerProgressData();
                }
            }
            else
            {
                _cachedData = new PlayerProgressData();
            }

            // Ensure arrays are sized to 10
            if (_cachedData.levelStars == null || _cachedData.levelStars.Length < 10)
            {
                _cachedData.levelStars = new int[10];
            }
            if (_cachedData.levelHighScores == null || _cachedData.levelHighScores.Length < 10)
            {
                _cachedData.levelHighScores = new int[10];
            }
        }

        public static void SaveProgress()
        {
            if (_cachedData == null) return;
            string json = JsonUtility.ToJson(_cachedData);
            PlayerPrefs.SetString(SAVE_KEY, json);
            PlayerPrefs.Save();
        }

        public static bool IsLevelUnlocked(int levelNumber)
        {
            if (levelNumber <= 1) return true;
            return Data.highestUnlockedLevel >= levelNumber;
        }

        public static int GetStars(int levelNumber)
        {
            if (levelNumber < 1 || levelNumber > 10) return 0;
            return Data.levelStars[levelNumber - 1];
        }

        public static void CompleteLevel(int levelNumber, int score, int stars)
        {
            if (levelNumber < 1 || levelNumber > 10) return;
            int idx = levelNumber - 1;

            if (stars > Data.levelStars[idx])
            {
                Data.levelStars[idx] = stars;
            }

            if (score > Data.levelHighScores[idx])
            {
                Data.levelHighScores[idx] = score;
            }

            // Unlock next level if completed with at least 1 star
            if (stars >= 1 && levelNumber < 10)
            {
                if (Data.highestUnlockedLevel < levelNumber + 1)
                {
                    Data.highestUnlockedLevel = levelNumber + 1;
                }
            }

            // Check for skin unlocks based on progression
            CheckSkinUnlocks();

            SaveProgress();
        }

        private static void CheckSkinUnlocks()
        {
            // Unlock "dart" at Class 3
            if (Data.highestUnlockedLevel >= 3 && !Data.unlockedSkins.Contains("dart"))
            {
                Data.unlockedSkins.Add("dart");
            }
            // Unlock "cruiser" at Class 6
            if (Data.highestUnlockedLevel >= 6 && !Data.unlockedSkins.Contains("cruiser"))
            {
                Data.unlockedSkins.Add("cruiser");
            }
            // Unlock "quantum" at Class 9
            if (Data.highestUnlockedLevel >= 9 && !Data.unlockedSkins.Contains("quantum"))
            {
                Data.unlockedSkins.Add("quantum");
            }
        }

        public static void ResetAllProgress()
        {
            _cachedData = new PlayerProgressData();
            PlayerPrefs.DeleteKey(SAVE_KEY);
            PlayerPrefs.Save();
        }
    }
}

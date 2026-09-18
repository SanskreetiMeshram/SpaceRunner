using System;
using System.Collections.Generic;
using UnityEngine;

namespace SpaceGame.Data
{
    /// <summary>
    /// Represents an individual curriculum quiz question.
    /// </summary>
    [Serializable]
    public class QuestionItem
    {
        public string id;
        public string subject;
        public string topic;
        public string difficulty;
        public string questionText;
        public string type; // "mcq" or "fill_blank"
        public string[] options;
        public int correctIndex;
        public string[] solutionSteps;
        public string hint;

        public bool IsAnswerCorrect(int selectedIndex)
        {
            return selectedIndex == correctIndex;
        }

        public string GetSubjectEmoji()
        {
            switch (subject.ToLower())
            {
                case "math": return "🧮";
                case "physics": return "⚡";
                case "chemistry": return "⚗️";
                case "biology": return "🔬";
                case "evs":
                case "science": return "🌿";
                default: return "⭐";
            }
        }
    }

    /// <summary>
    /// Represents a complete question bank for a specific grade level.
    /// </summary>
    [Serializable]
    public class QuestionBank
    {
        public int level;
        public string @class;
        public string subject;
        public string description;
        public List<QuestionItem> questions;

        public static QuestionBank FromJson(string jsonText)
        {
            return JsonUtility.FromJson<QuestionBank>(jsonText);
        }
    }

    /// <summary>
    /// Tracking subject accuracy stats for educational analytics.
    /// </summary>
    [Serializable]
    public class SubjectAccuracy
    {
        public string subject;
        public int correctAnswers;
        public int totalAttempts;

        public float AccuracyPercentage
        {
            get
            {
                if (totalAttempts <= 0) return 0f;
                return ((float)correctAnswers / totalAttempts) * 100f;
            }
        }
    }

    /// <summary>
    /// Persistent player progression across levels and unlocks.
    /// </summary>
    [Serializable]
    public class PlayerProgressData
    {
        public int highestUnlockedLevel = 1;
        public int totalCoins = 0;
        public int totalScore = 0;
        public int[] levelStars = new int[10]; // 0 to 3 stars per level
        public int[] levelHighScores = new int[10];
        public List<string> unlockedSkins = new List<string> { "saucer" };
        public string selectedSkin = "saucer";
        public List<SubjectAccuracy> subjectMetrics = new List<SubjectAccuracy>();

        public void RecordAnswer(string subject, bool isCorrect)
        {
            SubjectAccuracy stat = subjectMetrics.Find(s => s.subject.Equals(subject, StringComparison.OrdinalIgnoreCase));
            if (stat == null)
            {
                stat = new SubjectAccuracy { subject = subject, correctAnswers = 0, totalAttempts = 0 };
                subjectMetrics.Add(stat);
            }
            stat.totalAttempts++;
            if (isCorrect) stat.correctAnswers++;
        }

        public float GetSubjectAccuracy(string subject)
        {
            SubjectAccuracy stat = subjectMetrics.Find(s => s.subject.Equals(subject, StringComparison.OrdinalIgnoreCase));
            return stat != null ? stat.AccuracyPercentage : 0f;
        }
    }
}

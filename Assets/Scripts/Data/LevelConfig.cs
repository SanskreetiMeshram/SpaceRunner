using System;
using UnityEngine;

namespace SpaceGame.Data
{
    /// <summary>
    /// Configuration for a specific grade level, defining difficulty, speed, theme colors, and targets.
    /// </summary>
    [Serializable]
    public class LevelConfig
    {
        public int levelNumber;
        public string className;
        public string zoneName;
        public string subjectsSummary;
        public float baseRunnerSpeed;
        public float obstacleSpawnRate; // seconds between obstacle spawns
        public float coinSpawnRate;     // seconds between coin spawns
        public int targetCoins;         // questions required to complete level
        public Color primaryColor;
        public Color secondaryColor;
        public Color accentColor;

        public static LevelConfig GetConfigForLevel(int level)
        {
            switch (level)
            {
                case 1:
                    return new LevelConfig
                    {
                        levelNumber = 1,
                        className = "Class 1",
                        zoneName = "Playful Stardust Nebula",
                        subjectsSummary = "Math (Counting & Shapes)",
                        baseRunnerSpeed = 3.5f,
                        obstacleSpawnRate = 3.2f,
                        coinSpawnRate = 3.5f,
                        targetCoins = 5,
                        primaryColor = new Color(0.95f, 0.45f, 0.70f), // Soft pink/rose
                        secondaryColor = new Color(0.35f, 0.15f, 0.50f),
                        accentColor = new Color(1f, 0.85f, 0.35f)
                    };
                case 2:
                    return new LevelConfig
                    {
                        levelNumber = 2,
                        className = "Class 2",
                        zoneName = "Azure Crystal Belt",
                        subjectsSummary = "Math (2-Digit Add/Sub & Tables)",
                        baseRunnerSpeed = 4.0f,
                        obstacleSpawnRate = 2.9f,
                        coinSpawnRate = 3.3f,
                        targetCoins = 5,
                        primaryColor = new Color(0.20f, 0.75f, 0.90f), // Cyan blue
                        secondaryColor = new Color(0.10f, 0.25f, 0.55f),
                        accentColor = new Color(0.40f, 1f, 0.60f)
                    };
                case 3:
                    return new LevelConfig
                    {
                        levelNumber = 3,
                        className = "Class 3",
                        zoneName = "Emerald Aurora Fields",
                        subjectsSummary = "Math (Division & Fractions)",
                        baseRunnerSpeed = 4.3f,
                        obstacleSpawnRate = 2.7f,
                        coinSpawnRate = 3.2f,
                        targetCoins = 5,
                        primaryColor = new Color(0.25f, 0.85f, 0.55f), // Emerald green
                        secondaryColor = new Color(0.08f, 0.35f, 0.25f),
                        accentColor = new Color(0.95f, 0.95f, 0.30f)
                    };
                case 4:
                    return new LevelConfig
                    {
                        levelNumber = 4,
                        className = "Class 4",
                        zoneName = "Golden Solar Flare Way",
                        subjectsSummary = "Math + Environmental Studies (EVS)",
                        baseRunnerSpeed = 4.6f,
                        obstacleSpawnRate = 2.5f,
                        coinSpawnRate = 3.0f,
                        targetCoins = 6,
                        primaryColor = new Color(1.0f, 0.75f, 0.20f), // Golden Amber
                        secondaryColor = new Color(0.50f, 0.25f, 0.05f),
                        accentColor = new Color(0.30f, 0.90f, 0.95f)
                    };
                case 5:
                    return new LevelConfig
                    {
                        levelNumber = 5,
                        className = "Class 5",
                        zoneName = "Deep Ocean Galaxy",
                        subjectsSummary = "Math + Intro Science & Anatomy",
                        baseRunnerSpeed = 5.0f,
                        obstacleSpawnRate = 2.3f,
                        coinSpawnRate = 3.0f,
                        targetCoins = 6,
                        primaryColor = new Color(0.20f, 0.45f, 0.95f), // Royal Blue
                        secondaryColor = new Color(0.05f, 0.15f, 0.45f),
                        accentColor = new Color(0.95f, 0.40f, 0.80f)
                    };
                case 6:
                    return new LevelConfig
                    {
                        levelNumber = 6,
                        className = "Class 6",
                        zoneName = "Amethyst Pulsar Cluster",
                        subjectsSummary = "Math (Integers) + Food & Motion",
                        baseRunnerSpeed = 5.3f,
                        obstacleSpawnRate = 2.2f,
                        coinSpawnRate = 2.9f,
                        targetCoins = 6,
                        primaryColor = new Color(0.70f, 0.30f, 0.90f), // Violet
                        secondaryColor = new Color(0.28f, 0.08f, 0.45f),
                        accentColor = new Color(0.40f, 1.0f, 0.85f)
                    };
                case 7:
                    return new LevelConfig
                    {
                        levelNumber = 7,
                        className = "Class 7",
                        zoneName = "Plasma Storm Expanse",
                        subjectsSummary = "Math + Physics + Chemistry + Biology",
                        baseRunnerSpeed = 5.6f,
                        obstacleSpawnRate = 2.1f,
                        coinSpawnRate = 2.8f,
                        targetCoins = 7,
                        primaryColor = new Color(0.95f, 0.25f, 0.45f), // Crimson Coral
                        secondaryColor = new Color(0.40f, 0.05f, 0.20f),
                        accentColor = new Color(1.0f, 0.90f, 0.35f)
                    };
                case 8:
                    return new LevelConfig
                    {
                        levelNumber = 8,
                        className = "Class 8",
                        zoneName = "Quantum Magnetic Rings",
                        subjectsSummary = "Full Syllabus: Forces, Pressure, Cells",
                        baseRunnerSpeed = 6.0f,
                        obstacleSpawnRate = 2.0f,
                        coinSpawnRate = 2.8f,
                        targetCoins = 7,
                        primaryColor = new Color(0.15f, 0.85f, 0.85f), // Electric Teal
                        secondaryColor = new Color(0.05f, 0.30f, 0.35f),
                        accentColor = new Color(1.0f, 0.40f, 0.60f)
                    };
                case 9:
                    return new LevelConfig
                    {
                        levelNumber = 9,
                        className = "Class 9",
                        zoneName = "Supernova Deep Core",
                        subjectsSummary = "Full Syllabus: Motion, Gravity, Atoms",
                        baseRunnerSpeed = 6.3f,
                        obstacleSpawnRate = 1.9f,
                        coinSpawnRate = 2.7f,
                        targetCoins = 8,
                        primaryColor = new Color(0.90f, 0.50f, 0.15f), // Molten Orange
                        secondaryColor = new Color(0.35f, 0.10f, 0.05f),
                        accentColor = new Color(0.50f, 0.70f, 1.0f)
                    };
                case 10:
                default:
                    return new LevelConfig
                    {
                        levelNumber = 10,
                        className = "Class 10",
                        zoneName = "Master Academy Cosmos",
                        subjectsSummary = "Board Syllabus: Optics, Electricity, Genetics",
                        baseRunnerSpeed = 6.6f,
                        obstacleSpawnRate = 1.8f,
                        coinSpawnRate = 2.6f,
                        targetCoins = 8,
                        primaryColor = new Color(0.85f, 0.15f, 0.20f), // Ruby Red
                        secondaryColor = new Color(0.30f, 0.05f, 0.10f),
                        accentColor = new Color(1.0f, 0.85f, 0.20f)
                    };
            }
        }
    }
}

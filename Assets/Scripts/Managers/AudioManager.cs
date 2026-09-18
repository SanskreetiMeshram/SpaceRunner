using UnityEngine;

namespace SpaceGame.Managers
{
    /// <summary>
    /// Handles background music and sound effects with procedural synth fallback
    /// ensuring immediate playback without requiring external audio files.
    /// </summary>
    public class AudioManager : MonoBehaviour
    {
        public static AudioManager Instance { get; private set; }

        [Header("Audio Sources")]
        [SerializeField] private AudioSource bgmSource;
        [SerializeField] private AudioSource sfxSource;

        [Header("Clips (Optional inspector assignments)")]
        [SerializeField] private AudioClip correctClip;
        [SerializeField] private AudioClip wrongClip;
        [SerializeField] private AudioClip coinClip;
        [SerializeField] private AudioClip dashClip;
        [SerializeField] private AudioClip starClip;
        [SerializeField] private AudioClip hitClip;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                EnsureAudioSources();
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private void EnsureAudioSources()
        {
            if (bgmSource == null)
            {
                bgmSource = gameObject.AddComponent<AudioSource>();
                bgmSource.loop = true;
                bgmSource.volume = 0.4f;
            }

            if (sfxSource == null)
            {
                sfxSource = gameObject.AddComponent<AudioSource>();
                sfxSource.volume = 0.8f;
            }

            // Generate procedural synth clips if inspector clips are missing
            if (correctClip == null) correctClip = CreateProceduralChime(587.33f, 880f, 0.35f);   // D5 to A5 pleasant bell
            if (wrongClip == null) wrongClip = CreateProceduralSoftTone(349.23f, 261.63f, 0.45f); // F4 to C4 gentle chime
            if (coinClip == null) coinClip = CreateProceduralChime(659.25f, 1046.5f, 0.25f);    // E5 to C6 sparkle
            if (dashClip == null) dashClip = CreateProceduralWhoosh(0.3f);
            if (starClip == null) starClip = CreateProceduralFanfare(0.6f);
            if (hitClip == null) hitClip = CreateProceduralThud(0.2f);
        }

        public void PlayBGM()
        {
            if (bgmSource == null) return;
            if (!bgmSource.isPlaying)
            {
                // If no BGM clip assigned, generate a calm pleasant ambient synth loop
                if (bgmSource.clip == null)
                {
                    bgmSource.clip = CreateAmbientSynthLoop(4.0f);
                }
                bgmSource.Play();
            }
        }

        public void StopBGM()
        {
            if (bgmSource != null) bgmSource.Stop();
        }

        public void PlayCorrect()
        {
            PlaySFX(correctClip);
        }

        public void PlayWrongSoft()
        {
            PlaySFX(wrongClip);
        }

        public void PlayCoin()
        {
            PlaySFX(coinClip);
        }

        public void PlayDash()
        {
            PlaySFX(dashClip);
        }

        public void PlayStar()
        {
            PlaySFX(starClip);
        }

        public void PlayHit()
        {
            PlaySFX(hitClip);
        }

        private void PlaySFX(AudioClip clip)
        {
            if (sfxSource != null && clip != null)
            {
                sfxSource.PlayOneShot(clip);
            }
        }

        // ================= PROCEDURAL SYNTHESIS HELPERS ================= //

        private AudioClip CreateProceduralChime(float freq1, float freq2, float duration)
        {
            int sampleRate = 44100;
            int sampleCount = (int)(sampleRate * duration);
            float[] samples = new float[sampleCount];

            for (int i = 0; i < sampleCount; i++)
            {
                float t = (float)i / sampleRate;
                float progress = (float)i / sampleCount;
                float currentFreq = Mathf.Lerp(freq1, freq2, progress);

                // Decay envelope
                float envelope = Mathf.Exp(-progress * 4.5f);

                // Two harmonics for sparkling bell tone
                float wave = Mathf.Sin(2f * Mathf.PI * currentFreq * t) * 0.7f +
                             Mathf.Sin(4f * Mathf.PI * currentFreq * t) * 0.3f;

                samples[i] = wave * envelope * 0.6f;
            }

            AudioClip clip = AudioClip.Create("ProceduralChime", sampleCount, 1, sampleRate, false);
            clip.SetData(samples, 0);
            return clip;
        }

        private AudioClip CreateProceduralSoftTone(float freq1, float freq2, float duration)
        {
            int sampleRate = 44100;
            int sampleCount = (int)(sampleRate * duration);
            float[] samples = new float[sampleCount];

            for (int i = 0; i < sampleCount; i++)
            {
                float t = (float)i / sampleRate;
                float progress = (float)i / sampleCount;
                float currentFreq = Mathf.Lerp(freq1, freq2, progress);

                // Gentle rounded envelope (avoiding sharp harsh clicks)
                float envelope = Mathf.Sin(progress * Mathf.PI) * Mathf.Exp(-progress * 2.0f);

                // Warm triangular/sine blend
                float wave = Mathf.Sin(2f * Mathf.PI * currentFreq * t);
                samples[i] = wave * envelope * 0.45f;
            }

            AudioClip clip = AudioClip.Create("ProceduralSoftTone", sampleCount, 1, sampleRate, false);
            clip.SetData(samples, 0);
            return clip;
        }

        private AudioClip CreateProceduralWhoosh(float duration)
        {
            int sampleRate = 44100;
            int sampleCount = (int)(sampleRate * duration);
            float[] samples = new float[sampleCount];

            for (int i = 0; i < sampleCount; i++)
            {
                float progress = (float)i / sampleCount;
                float envelope = Mathf.Sin(progress * Mathf.PI);
                // Filtered white noise
                float noise = (Random.value * 2f - 1f) * envelope * 0.4f;
                samples[i] = noise;
            }

            AudioClip clip = AudioClip.Create("ProceduralWhoosh", sampleCount, 1, sampleRate, false);
            clip.SetData(samples, 0);
            return clip;
        }

        private AudioClip CreateProceduralFanfare(float duration)
        {
            int sampleRate = 44100;
            int sampleCount = (int)(sampleRate * duration);
            float[] samples = new float[sampleCount];

            float[] notes = { 523.25f, 659.25f, 783.99f, 1046.50f }; // C, E, G, High C

            for (int i = 0; i < sampleCount; i++)
            {
                float t = (float)i / sampleRate;
                float progress = (float)i / sampleCount;

                int noteIdx = Mathf.Min((int)(progress * notes.Length), notes.Length - 1);
                float freq = notes[noteIdx];

                float envelope = Mathf.Exp(-((progress * 4f) % 1f) * 3f);
                float wave = Mathf.Sin(2f * Mathf.PI * freq * t);

                samples[i] = wave * envelope * 0.5f;
            }

            AudioClip clip = AudioClip.Create("ProceduralFanfare", sampleCount, 1, sampleRate, false);
            clip.SetData(samples, 0);
            return clip;
        }

        private AudioClip CreateProceduralThud(float duration)
        {
            int sampleRate = 44100;
            int sampleCount = (int)(sampleRate * duration);
            float[] samples = new float[sampleCount];

            for (int i = 0; i < sampleCount; i++)
            {
                float t = (float)i / sampleRate;
                float progress = (float)i / sampleCount;
                float freq = Mathf.Lerp(160f, 40f, progress);
                float envelope = Mathf.Exp(-progress * 8f);
                samples[i] = Mathf.Sin(2f * Mathf.PI * freq * t) * envelope * 0.5f;
            }

            AudioClip clip = AudioClip.Create("ProceduralThud", sampleCount, 1, sampleRate, false);
            clip.SetData(samples, 0);
            return clip;
        }

        private AudioClip CreateAmbientSynthLoop(float duration)
        {
            int sampleRate = 22050;
            int sampleCount = (int)(sampleRate * duration);
            float[] samples = new float[sampleCount];

            for (int i = 0; i < sampleCount; i++)
            {
                float t = (float)i / sampleRate;
                // Calming space drone with fifth harmony
                float s1 = Mathf.Sin(2f * Mathf.PI * 130.81f * t); // C3
                float s2 = Mathf.Sin(2f * Mathf.PI * 196.00f * t); // G3
                float s3 = Mathf.Sin(2f * Mathf.PI * 261.63f * t); // C4
                samples[i] = (s1 * 0.4f + s2 * 0.3f + s3 * 0.2f) * 0.2f;
            }

            AudioClip clip = AudioClip.Create("AmbientSynthLoop", sampleCount, 1, sampleRate, false);
            clip.SetData(samples, 0);
            return clip;
        }
    }
}

using UnityEngine;
using UnityEngine.UI;
using SpaceGame.Data;

namespace SpaceGame.UI
{
    /// <summary>
    /// Customization modal allowing players to choose unlocked UFO spaceship skins and colors.
    /// </summary>
    public class SkinSelectUI : MonoBehaviour
    {
        [Header("Skin Cards")]
        [SerializeField] private Button saucerButton;
        [SerializeField] private Button dartButton;
        [SerializeField] private Button cruiserButton;
        [SerializeField] private Button quantumButton;

        [Header("Lock Overlays")]
        [SerializeField] private GameObject dartLockOverlay;
        [SerializeField] private GameObject cruiserLockOverlay;
        [SerializeField] private GameObject quantumLockOverlay;

        [Header("Close Button")]
        [SerializeField] private Button closeButton;

        private void Awake()
        {
            if (saucerButton != null) saucerButton.onClick.AddListener(() => SelectSkin("saucer"));
            if (dartButton != null) dartButton.onClick.AddListener(() => SelectSkin("dart"));
            if (cruiserButton != null) cruiserButton.onClick.AddListener(() => SelectSkin("cruiser"));
            if (quantumButton != null) quantumButton.onClick.AddListener(() => SelectSkin("quantum"));
            if (closeButton != null) closeButton.onClick.AddListener(Close);
        }

        private void OnEnable()
        {
            RefreshSkinState();
        }

        public void RefreshSkinState()
        {
            var unlocked = ProgressTracker.Data.unlockedSkins;

            bool hasDart = unlocked.Contains("dart");
            bool hasCruiser = unlocked.Contains("cruiser");
            bool hasQuantum = unlocked.Contains("quantum");

            if (dartButton != null) dartButton.interactable = hasDart;
            if (dartLockOverlay != null) dartLockOverlay.SetActive(!hasDart);

            if (cruiserButton != null) cruiserButton.interactable = hasCruiser;
            if (cruiserLockOverlay != null) cruiserLockOverlay.SetActive(!hasCruiser);

            if (quantumButton != null) quantumButton.interactable = hasQuantum;
            if (quantumLockOverlay != null) quantumLockOverlay.SetActive(!hasQuantum);
        }

        private void SelectSkin(string skinId)
        {
            ProgressTracker.Data.selectedSkin = skinId;
            ProgressTracker.SaveProgress();
            Close();
        }

        private void Close()
        {
            gameObject.SetActive(false);
        }
    }
}

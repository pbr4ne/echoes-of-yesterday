import { onMounted, onUnmounted, watch } from 'vue';
import { useStore } from './useStore';
import { applyFlickerEffect } from './spookyEffects/flickerEffect';
import { applyFlashlightEffect } from './spookyEffects/flashlightEffect';
import { applyOrbEffect, orbStyles } from './spookyEffects/orbEffect';
import { applyWhisperEffect } from './spookyEffects/whisperEffect';

export const useSpookyEffects = (toggleColdTrail: Function) => {

  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.get('DISABLE_EFFECTS') === 'true') {
    return;
  }

  const store = useStore();

  let cleanupFlicker: Function | null = null;
  let cleanupFlashlight: Function | null = null;
  let cleanupOrb: Function | null = null;
  let cleanupColdTrail: Function | null = null;
  let cleanupWhisper: Function | null = null;

  const applyGhostEffects = () => {
    if (cleanupFlicker) cleanupFlicker();
    if (cleanupFlashlight) cleanupFlashlight();
    if (cleanupOrb) cleanupOrb();
    if (cleanupColdTrail) toggleColdTrail(false);
    if (cleanupWhisper) cleanupWhisper();

    const ghosts = store.ghosts;

    Object.keys(ghosts).forEach((ghostKey) => {
      const ghost = ghosts[ghostKey as keyof typeof ghosts];

      if (!ghost.active.isActive) return;

      switch (ghostKey) {
        case 'poltergeist': {
          const flickerableComponents = document.querySelectorAll('.flickerable');
          if (flickerableComponents.length > 0) {
            const randomComponent = flickerableComponents[Math.floor(Math.random() * flickerableComponents.length)];
            cleanupFlicker = applyFlickerEffect(randomComponent as HTMLElement);
          }
          break;
        }
        case 'wraith':
          cleanupFlashlight = applyFlashlightEffect();
          break;
        case 'orb':
          cleanupOrb = applyOrbEffect();
          break;
        case 'phantom':
          toggleColdTrail(true);
          cleanupColdTrail = () => toggleColdTrail(false);
          break;
        case 'spirit':
          cleanupWhisper = applyWhisperEffect();
          break;
        default:
          break;
      }
    });
  };

  onMounted(() => {
    const style = document.createElement('style');
    style.textContent = orbStyles;
    document.head.appendChild(style);

    watch(
      () => store.ghosts,
      () => {
        applyGhostEffects();
      },
      { deep: true }
    );
  });

  onUnmounted(() => {
    const style = document.head.querySelector('style');
    if (style) {
      document.head.removeChild(style);
    }

    if (cleanupFlicker) cleanupFlicker();
    if (cleanupFlashlight) cleanupFlashlight();
    if (cleanupOrb) cleanupOrb();
    if (cleanupColdTrail) toggleColdTrail(false);
    if (cleanupWhisper) cleanupWhisper();
  });
};

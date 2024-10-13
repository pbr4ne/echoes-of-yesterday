import { onMounted, onUnmounted, watch } from 'vue';
import { useStore } from './useStore';
import { applyFlickerEffect } from './spookyEffects/flickerEffect';
import { applyFlashlightEffect } from './spookyEffects/flashlightEffect';
import { applyOrbEffect, orbStyles } from './spookyEffects/orbEffect';

export const useSpookyEffects = (toggleCursorTrail: Function) => {
  const store = useStore();

  let cleanupFlicker: Function | null = null;
  let cleanupFlashlight: Function | null = null;
  let cleanupOrb: Function | null = null;
  let cleanupCursorTrail: Function | null = null;

  const applyGhostEffects = () => {
    if (cleanupFlicker) cleanupFlicker();
    if (cleanupFlashlight) cleanupFlashlight();
    if (cleanupOrb) cleanupOrb();
    if (cleanupCursorTrail) toggleCursorTrail(false);

    const ghosts = store.ghosts;

    Object.keys(ghosts).forEach((ghostKey) => {
      const ghost = ghosts[ghostKey as keyof typeof ghosts];

      if (!ghost.isActive) return;

      switch (ghostKey) {
        case 'poltergeist':
          const flickerableComponents = document.querySelectorAll('.flickerable');
          if (flickerableComponents.length > 0) {
            const randomComponent = flickerableComponents[Math.floor(Math.random() * flickerableComponents.length)];
            cleanupFlicker = applyFlickerEffect(randomComponent as HTMLElement);
          }
          break;
        case 'wraith':
          cleanupFlashlight = applyFlashlightEffect();
          break;
        case 'orb':
          cleanupOrb = applyOrbEffect();
          break;
        case 'phantom':
          toggleCursorTrail(true);
          cleanupCursorTrail = () => toggleCursorTrail(false);
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
    if (cleanupCursorTrail) toggleCursorTrail(false);
  });
};

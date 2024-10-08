import { onMounted, onUnmounted } from 'vue';
import { applyFlickerEffect } from './spookyEffects/flickerEffect';
import { applyWarpEffect } from './spookyEffects/warpEffect';
import { applyGlitchEffect } from './spookyEffects/glitchEffect';
import { applyFlashlightEffect } from './spookyEffects/flashlightEffect';
import { applyOrbEffect, orbStyles } from './spookyEffects/orbEffect';

export const useSpookyEffects = () => {
  const applyRandomEffect = () => {
    const flickerableComponents = document.querySelectorAll('.flickerable');
    const warpableComponents = document.querySelectorAll('.warpable');
    const glitchableComponents = document.querySelectorAll('.glitchable');

    const randomEffect = Math.random();
    let cleanup: Function | null = null;

    if (randomEffect < 0.2) {
      if (flickerableComponents.length === 0) return;
      const randomComponent = flickerableComponents[Math.floor(Math.random() * flickerableComponents.length)];
      applyFlickerEffect(randomComponent as HTMLElement);
    } else if (randomEffect < 0.4) {
      if (warpableComponents.length === 0) return;
      const randomComponent = warpableComponents[Math.floor(Math.random() * warpableComponents.length)];
      applyWarpEffect(randomComponent as HTMLElement);
    } else if (randomEffect < 0.6) {
      if (glitchableComponents.length === 0) return;
      const randomComponent = glitchableComponents[Math.floor(Math.random() * glitchableComponents.length)];
      applyGlitchEffect(randomComponent as HTMLElement);
    } else if (randomEffect < 0.8) {
      cleanup = applyFlashlightEffect();
    } else {
      cleanup = applyOrbEffect();
    }

    setTimeout(() => {
      if (cleanup) cleanup();
    }, 10000);
  };

  const setFixedInterval = (callback: Function, interval: number) => {
    setInterval(() => {
      callback();
    }, interval);
  };

  onMounted(() => {
    const style = document.createElement('style');
    style.textContent = orbStyles;
    document.head.appendChild(style);

    setFixedInterval(applyRandomEffect, 10000);
  });

  onUnmounted(() => {
    const style = document.head.querySelector('style');
    if (style) {
      document.head.removeChild(style);
    }
  });
};

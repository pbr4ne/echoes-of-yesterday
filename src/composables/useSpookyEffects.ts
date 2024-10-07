import { onMounted } from 'vue';
import { applyFlickerEffect } from './spookyEffects/flickerEffect';
import { applyWarpEffect } from './spookyEffects/warpEffect';
import { applyGlitchEffect } from './spookyEffects/glitchEffect';
import { applyFlashlightEffect } from './spookyEffects/flashlightEffect';

export const useSpookyEffects = (toggleCursorTrail: Function, toggleClickableOrb: Function) => {
  const applyRandomEffect = () => {
    const flickerableComponents = document.querySelectorAll('.flickerable');
    const warpableComponents = document.querySelectorAll('.warpable');
    const glitchableComponents = document.querySelectorAll('.glitchable');

    const randomEffect = Math.random();

    if (randomEffect < 0.2) {
      console.log("attempting flicker");
      if (flickerableComponents.length === 0) return;
      const randomComponent = flickerableComponents[Math.floor(Math.random() * flickerableComponents.length)];
      applyFlickerEffect(randomComponent as HTMLElement);
    } else if (randomEffect < 0.4) {
      console.log("attempting warp");
      if (warpableComponents.length === 0) return;
      const randomComponent = warpableComponents[Math.floor(Math.random() * warpableComponents.length)];
      applyWarpEffect(randomComponent as HTMLElement);
    } else if (randomEffect < 0.6) {
      console.log("attempting glitch");
      if (glitchableComponents.length === 0) return;
      const randomComponent = glitchableComponents[Math.floor(Math.random() * glitchableComponents.length)];
      applyGlitchEffect(randomComponent as HTMLElement);
    } else if (randomEffect < 0.7) {
      console.log("attempting flashlight");
      applyFlashlightEffect();
    } else if (randomEffect < 0.85) {
      console.log("toggling cursor trail");
      toggleCursorTrail(true);
      setTimeout(() => toggleCursorTrail(false), 10000);
    } else {
      console.log("toggling clickable orb");
      toggleClickableOrb(true);
      setTimeout(() => toggleClickableOrb(false), 10000);
    }
  };

  const setFixedInterval = (callback: Function, interval: number) => {
    setInterval(() => {
      callback();
    }, interval);
  };

  onMounted(() => {
    setFixedInterval(applyRandomEffect, 10000); // Apply one effect every 10 seconds
  });
};

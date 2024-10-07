import { onMounted } from 'vue';
import { applyFlickerEffect } from './spookyEffects/flickerEffect';
import { applyWarpEffect } from './spookyEffects/warpEffect';
import { applyGlitchEffect } from './spookyEffects/glitchEffect';
import { applyFlashlightEffect } from './spookyEffects/flashlightEffect';

const applyRandomEffect = () => {
  const flickerableComponents = document.querySelectorAll('.flickerable');
  const warpableComponents = document.querySelectorAll('.warpable');
  const glitchableComponents = document.querySelectorAll('.glitchable');

  const randomEffect = Math.random();

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
    applyFlashlightEffect();
  }
};

const setRandomInterval = (callback: Function) => {
  const randomDelay = Math.random() * (10000 - 5000) + 5000;
  setTimeout(() => {
    callback();
    setRandomInterval(callback);
  }, randomDelay);
};

export const useSpookyEffects = () => {
  onMounted(() => {
    setRandomInterval(applyRandomEffect);
  });
};

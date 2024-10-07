import { onMounted } from 'vue';
import gsap from 'gsap';

const applyFlickerEffect = (component: HTMLElement) => {
  gsap.to(component, {
    opacity: 0.3, 
    duration: 0.1,
    repeat: 5, 
    yoyo: true, 
    ease: "power1.inOut", 
  });
  console.log("flickering");
};

const applyWarpEffect = (component: HTMLElement) => {
  gsap.to(component, {
    scaleX: 1.1,
    scaleY: 0.9,
    skewX: 10,
    duration: 0.2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1,
  });
  console.log("warping");
};

const applyGlitchEffect = (component: HTMLElement) => {
  const initialTransform = component.style.transform || '';

  const glitchTimeline = gsap.timeline({
    onComplete: () => {
      component.style.transform = initialTransform;
      console.log("reset glitch");
    },
  });

  glitchTimeline
    .to(component, {
      duration: 0.1,
      x: "+=10px", 
      skewX: 10, 
      opacity: 0.8, 
      ease: "power1.inOut",
    })
    .to(component, {
      duration: 0.05,
      x: "-=20px", 
      skewX: -5, 
      opacity: 0.5, 
      ease: "power1.inOut",
    })
    .to(component, {
      duration: 0.1,
      x: "+=5px", 
      skewX: 0, 
      opacity: 1, 
      ease: "power1.inOut",
    })
    .repeat(3);

  console.log("glitching");
};

const applyRandomEffect = () => {
  const flickerableComponents = document.querySelectorAll('.flickerable');
  const warpableComponents = document.querySelectorAll('.warpable');
  const glitchableComponents = document.querySelectorAll('.glitchable');

  const randomEffect = Math.random();

  if (randomEffect < 0.25 && flickerableComponents.length > 0) {
    const randomComponent = flickerableComponents[Math.floor(Math.random() * flickerableComponents.length)];
    applyFlickerEffect(randomComponent as HTMLElement);
  } else if (randomEffect < 0.5 && warpableComponents.length > 0) {
    const randomComponent = warpableComponents[Math.floor(Math.random() * warpableComponents.length)];
    applyWarpEffect(randomComponent as HTMLElement);
  } else if (randomEffect < 0.75 && glitchableComponents.length > 0) {
    const randomComponent = glitchableComponents[Math.floor(Math.random() * glitchableComponents.length)];
    applyGlitchEffect(randomComponent as HTMLElement);
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


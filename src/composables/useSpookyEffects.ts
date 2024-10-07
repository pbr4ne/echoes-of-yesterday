import { onMounted } from 'vue';
import gsap from 'gsap';

let flashlightActive = false;

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

const applyFlashlightEffect = () => {
  if (flashlightActive) return;

  flashlightActive = true;

  const flashlight = document.createElement('div');

  flashlight.style.position = 'fixed';
  flashlight.style.top = '0';
  flashlight.style.left = '0';
  flashlight.style.width = '100vw';
  flashlight.style.height = '100vh';
  flashlight.style.pointerEvents = 'none';
  flashlight.style.zIndex = '9999';
  flashlight.style.transition = 'background 0.1s ease';

  document.body.appendChild(flashlight);

  const moveFlashlight = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    flashlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 80px, rgba(0, 0, 0, 0.85) 150px)`;
  };

  window.addEventListener('mousemove', moveFlashlight);

  setTimeout(() => {
    window.removeEventListener('mousemove', moveFlashlight);
    flashlight.remove();
    flashlightActive = false;
    console.log("flashlight effect removed");
  }, 10000);

  console.log("flashlight effect applied");
};

const applyRandomEffect = () => {
  const flickerableComponents = document.querySelectorAll('.flickerable');
  const warpableComponents = document.querySelectorAll('.warpable');
  const glitchableComponents = document.querySelectorAll('.glitchable');

  const randomEffect = Math.random();

  if (randomEffect < 0.2 && flickerableComponents.length > 0) {
    const randomComponent = flickerableComponents[Math.floor(Math.random() * flickerableComponents.length)];
    applyFlickerEffect(randomComponent as HTMLElement);
  } else if (randomEffect < 0.4 && warpableComponents.length > 0) {
    const randomComponent = warpableComponents[Math.floor(Math.random() * warpableComponents.length)];
    applyWarpEffect(randomComponent as HTMLElement);
  } else if (randomEffect < 0.6 && glitchableComponents.length > 0) {
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


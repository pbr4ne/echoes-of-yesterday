import gsap from 'gsap';

export const applyGlitchEffect = (component: HTMLElement) => {
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

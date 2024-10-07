import gsap from 'gsap';

export const applyFlickerEffect = (component: HTMLElement) => {
  gsap.to(component, {
    opacity: 0.3, 
    duration: 0.1,
    repeat: 5, 
    yoyo: true, 
    ease: "power1.inOut", 
  });
  console.log("flickering");
};

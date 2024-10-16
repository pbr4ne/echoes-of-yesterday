import gsap from 'gsap';

export const applyFlickerEffect = (component: HTMLElement): Function => {
  gsap.to(component, {
    opacity: 0.3,
    duration: 0.1,
    repeat: 5,
    yoyo: true,
    ease: "power1.inOut",
  });

  return () => {
    gsap.killTweensOf(component);
    component.style.opacity = '';
  };
};

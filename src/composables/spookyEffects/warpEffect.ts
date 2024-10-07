import gsap from 'gsap';

export const applyWarpEffect = (component: HTMLElement) => {
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

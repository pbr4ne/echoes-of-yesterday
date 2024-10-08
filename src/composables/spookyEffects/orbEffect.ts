//pondering my orb
import gsap from 'gsap';

let orbElement: HTMLElement | null = null;

const createOrb = () => {
  const orb = document.createElement('div');
  orb.classList.add('floating-orb');
  document.body.appendChild(orb);
  return orb;
};

const moveOrb = () => {
  if (orbElement) {
    gsap.to(orbElement, {
      x: () => Math.random() * (window.innerWidth - 50),
      y: () => Math.random() * (window.innerHeight - 50),
      duration: 5,
      ease: 'power1.inOut',
      onComplete: moveOrb,
    });
  }
};

const onOrbClick = () => {
  if (orbElement) {
    gsap.to(orbElement, { scale: 0.5, duration: 0.2 });
    gsap.to(orbElement, { scale: 1, duration: 0.5, delay: 0.2 });
  }
};

export const applyOrbEffect = () => {
  orbElement = createOrb();
  moveOrb();

  orbElement.addEventListener('click', onOrbClick);

  return () => {
    if (orbElement) {
      orbElement.removeEventListener('click', onOrbClick);
      orbElement.remove();
      orbElement = null;
    }
  };
};

export const orbStyles = `
  .floating-orb {
    position: fixed;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    z-index: 2000;
    cursor: pointer;
    pointer-events: all;
  }
`;

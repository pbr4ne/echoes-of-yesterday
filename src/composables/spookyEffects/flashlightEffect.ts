let flashlightActive = false;

export const applyFlashlightEffect = () => {
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

  const initializeFlashlightPosition = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    flashlight.style.background = `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(255, 255, 255, 0.2) 80px, rgba(0, 0, 0, 0.85) 150px)`;
  };

  initializeFlashlightPosition();

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

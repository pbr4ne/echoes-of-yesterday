let flashlightActive = false;

export const applyFlashlightEffect = () => {
  if (flashlightActive) {
    return () => {};
  }

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

  const moveFlashlight = (x: number, y: number) => {
    flashlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 80px, rgba(0, 0, 0, 0.85) 150px)`;
  };

  const handleMouseMove = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    moveFlashlight(x, y);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      moveFlashlight(x, y);
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove);

  const cleanup = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleTouchMove);
    flashlight.remove();
    flashlightActive = false;
  };

  return cleanup;
};

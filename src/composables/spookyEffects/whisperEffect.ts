import gsap from 'gsap';

const spookyWords = [
  'Help', 'Whimper', 'Psst', 'Hello?'
];

export const applyWhisperEffect = (): Function => {
  const style = document.createElement('style');
  style.textContent = whisperStyles;
  document.head.appendChild(style);

  const wordElement = document.createElement('div');
  wordElement.classList.add('spooky-word');
  wordElement.textContent = spookyWords[Math.floor(Math.random() * spookyWords.length)];
  
  document.body.appendChild(wordElement);

  const randomX = Math.random() * (window.innerWidth - 200);
  const randomY = Math.random() * (window.innerHeight - 100);

  gsap.set(wordElement, { x: randomX, y: randomY, opacity: 0 });

  gsap.to(wordElement, {
    y: randomY + 50,
    opacity: 0.5,
    duration: 1.0,
    ease: 'none',
  });

  gsap.to(wordElement, {
    y: randomY + 100,
    opacity: 0,
    duration: 1.0,
    ease: 'none',
    delay: 1.0,
    onComplete: () => {
      if (wordElement && wordElement.parentNode) {
        wordElement.parentNode.removeChild(wordElement);
      }
    }
  });

  return () => {
    if (wordElement && wordElement.parentNode) {
      wordElement.parentNode.removeChild(wordElement);
    }
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  };
};

export const whisperStyles = `
  .spooky-word {
    position: absolute;
    font-family: 'Zeyada', sans-serif;
    font-size: 2em;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    pointer-events: none;
    z-index: 1000;
  }
`;

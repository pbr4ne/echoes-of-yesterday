import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useGameLoop(ticksPerSecond = 20) {
  const tickCount = ref(0);
  let intervalId = ref<number | null>(null);
  let lastTime = 0;

  const subscribers = ref(new Set<(tick: number) => void>());

  const startGameLoop = () => {
    const tickInterval = 1000 / ticksPerSecond;
    const loop = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (delta >= tickInterval) {
        lastTime = time;
        tickCount.value += 1;
        subscribers.value.forEach((callback) => callback(tickCount.value));
      }
      intervalId.value = requestAnimationFrame(loop);
    };

    intervalId.value = requestAnimationFrame(loop);
  };

  const stopGameLoop = () => {
    if (intervalId.value !== null) {
      cancelAnimationFrame(intervalId.value);
      intervalId.value = null;
    }
  };

  const subscribe = (callback: (tick: number) => void) => {
    subscribers.value.add(callback);
    return () => {
      subscribers.value.delete(callback);
    };
  };

  onMounted(() => {
    startGameLoop();
  });

  onBeforeUnmount(() => {
    stopGameLoop();
  });

  return {
    tickCount,
    subscribe,
    startGameLoop,
    stopGameLoop
  };
}

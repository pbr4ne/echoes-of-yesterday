import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useGameLoop(ticksPerSecond = 20) {
  const tickCount = ref(0);
  const intervalId = ref<number | null>(null);
  const subscribers = ref(new Set<(tick: number) => void>());

  const startGameLoop = () => {
    const interval = 1000 / ticksPerSecond;
    intervalId.value = window.setInterval(() => {
      tickCount.value += 1;
      subscribers.value.forEach((callback) => callback(tickCount.value));
    }, interval);
  };

  const stopGameLoop = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
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

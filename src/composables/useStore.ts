import { defineStore } from 'pinia';
import mitt from 'mitt';

export type StateKeys = 'hunger' | 'thirst' | 'food' | 'water';

type GameEvent = {
  taskProgress: { key: StateKeys; progress: number };
};

export const emitter = mitt<GameEvent>();

export const useStore = defineStore('game', {
  state: () => ({
    hunger: 100,
    thirst: 100,
    food: 10,
    water: 10,
    pendingTasks: [] as { key: StateKeys; action: 'increase' | 'decrease'; startTime: number; duration: number }[],
  }),
  actions: {
    adjustValue(key: StateKeys, amount: number, max = 100, min = 0) {
      this[key] = Math.max(Math.min(this[key] + amount, max), min);
      this.saveState();
    },
    scheduleTask(key: StateKeys, action: 'increase' | 'decrease', amount: number, duration = 10000) {
      const startTime = Date.now();
      const task = { key, action, startTime, duration };
      this.pendingTasks.push(task);

      const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        emitter.emit('taskProgress', { key, progress });

        if (progress >= 100) {
          clearInterval(intervalId);
          if (action === 'increase') {
            this.adjustValue(key, amount);
          } else {
            this.adjustValue(key, -amount);
          }
          this.removeTask(key);
        }
      }, 50);
    },
    removeTask(key: StateKeys) {
      this.pendingTasks = this.pendingTasks.filter(task => task.key !== key);
    },
    saveState() {
      localStorage.setItem('game', JSON.stringify(this.$state));
    },
    loadState() {
      const savedState = localStorage.getItem('game');
      if (savedState) {
        this.$state = JSON.parse(savedState);
      }
    },
  },
});

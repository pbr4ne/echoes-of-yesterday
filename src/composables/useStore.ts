import { defineStore } from 'pinia';
import mitt from 'mitt';

export type StateKeys = 'hunger' | 'thirst' | 'food' | 'water';

type GameEvent = {
  taskProgress: { key: StateKeys; progress: number };
};

export const emitter = mitt<GameEvent>();

export const useStore = defineStore('gameState', {
  state: () => ({
    hunger: 100,
    thirst: 100,
    food: 10,
    water: 10,
    pendingTasks: [] as { key: StateKeys; action: 'increase' | 'decrease'; startTime: number; duration: number }[],
    gameLoopId: null as null | number,
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
    },

    startGameLoop() {
      const gameLoop = () => {
        const now = Date.now();

        this.pendingTasks = this.pendingTasks.filter(task => {
          const elapsed = now - task.startTime;
          const progress = Math.min((elapsed / task.duration) * 100, 100);
          emitter.emit('taskProgress', { key: task.key, progress });

          if (progress >= 100) {
            if (task.action === 'increase') {
              this.adjustValue(task.key, 1);
            } else {
              this.adjustValue(task.key, -1);
            }
            return false;
          }
          return true;
        });

        this.gameLoopId = requestAnimationFrame(gameLoop);
      };

      this.gameLoopId = requestAnimationFrame(gameLoop);
    },

    saveState() {
      localStorage.setItem('gameState', JSON.stringify(this.$state));
    },

    loadState() {
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        this.$state = JSON.parse(savedState);
      }
    },
  },
});

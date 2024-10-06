import { defineStore } from 'pinia';
import { emitter, ActionType } from '../utilities/emitter';

interface GameState {
  hunger: number;
  thirst: number;
  food: number;
  water: number;
  pendingTasks: { key: string; actionType: ActionType; startTime: number; duration: number }[];
}

export const useStore = defineStore('gameState', {
  state: (): GameState => ({
    hunger: 100,
    thirst: 100,
    food: 10,
    water: 10,
    pendingTasks: [],
  }),

  actions: {
    _gameLoopId: null as null | number,

    adjustValue(key: string, amount: number, max = 100, min = 0) {
      (this as Record<string, any>)[key] = Math.max(Math.min((this as Record<string, any>)[key] + amount, max), min);
    },

    scheduleTask(key: string, actionType: ActionType, amount: number, duration = 10000) {
      const startTime = Date.now();
      const task = { key, actionType, startTime, duration };
      this.pendingTasks.push(task);
    },

    listenForEvents() {
      emitter.on('actionStarted', ({ key, actionType }) => {
        this.scheduleTask(key, actionType, 1);
      });
    },

    startGameLoop() {
      const TICK_RATE = 50;
      let lastTick = Date.now();

      const gameLoop = () => {
        const now = Date.now();
        const delta = now - lastTick;

        if (delta >= TICK_RATE) {
          lastTick = now;

          this.pendingTasks = this.pendingTasks.filter(task => {
            const elapsed = now - task.startTime;
            const progress = Math.min((elapsed / task.duration) * 100, 100);
            emitter.emit('actionProgressed', { key: task.key, progress });

            if (progress >= 100) {
              if (task.actionType === 'increase') {
                this.adjustValue(task.key, 1);
              } else {
                this.adjustValue(task.key, -1);
              }
              emitter.emit('actionCompleted', { key: task.key });
              return false;
            }
            return true;
          });
        }

        this._gameLoopId = requestAnimationFrame(gameLoop);
      };

      this._gameLoopId = requestAnimationFrame(gameLoop);
    },

    initGame() {
      this.startGameLoop();
      this.listenForEvents();
    },
  },
});

import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';

export type StateKeys = 'hunger' | 'thirst' | 'food' | 'water';

export const useStore = defineStore('gameState', {
  state: () => ({
    hunger: 100,
    thirst: 100,
    food: 10,
    water: 10,
    pendingTasks: [] as { key: StateKeys; action: 'increase' | 'decrease'; startTime: number; duration: number }[],
  }),
  actions: {
    _gameLoopId: null as null | number,

    adjustValue(key: StateKeys, amount: number, max = 100, min = 0) {
      this[key] = Math.max(Math.min(this[key] + amount, max), min);
    },

    scheduleTask(key: StateKeys, action: 'increase' | 'decrease', amount: number, duration = 10000) {
      const startTime = Date.now();
      const task = { key, action, startTime, duration };
      this.pendingTasks.push(task);
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
        }
    
        this._gameLoopId = requestAnimationFrame(gameLoop);
      };
    
      this._gameLoopId = requestAnimationFrame(gameLoop);
    },
  },
});
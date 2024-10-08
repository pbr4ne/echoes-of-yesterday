import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { ActionKey, ActionType } from '../utilities/actions';

interface GameState {
  hunger: number;
  thirst: number;
  boredom: number;
  fatigue: number;
  fear: number;
  food: number;
  water: number;
  pendingTasks: { actionKey: ActionKey; actionType: ActionType; startTime: number; duration: number }[];
}

const initialState = (): GameState => ({
  hunger: 99,
  thirst: 74,
  boredom: 49,
  fatigue: 24,
  fear: 5,
  food: 10,
  water: 10,
  pendingTasks: [],
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    adjustValue(actionKey: ActionKey, amount: number, max = 100, min = 0) {
      this[actionKey] = Math.min(Math.max(this[actionKey] + amount, min), max);
    },

    scheduleTask(actionKey: ActionKey, actionType: ActionType, amount: number, duration = 10000) {
      const startTime = Date.now();
      const task = { actionKey, actionType, startTime, duration };
      this.pendingTasks.push(task);
    },

    listenForEvents() {
      emitter.on('actionStarted', ({ actionKey, actionType }) => {
        this.scheduleTask(actionKey, actionType, 1);
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
            emitter.emit('actionProgressed', { actionKey: task.actionKey, progress });

            if (progress >= 100) {
              if (task.actionType === 'increase') {
                this.adjustValue(task.actionKey, 1);
              } else {
                this.adjustValue(task.actionKey, -1);
              }
              emitter.emit('actionCompleted', { actionKey: task.actionKey });
              return false;
            }
            return true;
          });
        }

        this._gameLoopId = requestAnimationFrame(gameLoop);
      };

      this._gameLoopId = requestAnimationFrame(gameLoop);
    },

    reset() {
      Object.assign(this.$state, initialState());
    },

    initGame() {
      this.startGameLoop();
      this.listenForEvents();
    },
  },
});

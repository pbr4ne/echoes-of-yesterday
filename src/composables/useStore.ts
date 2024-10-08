import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { ActionKey, ActionType } from '../utilities/actions';

interface Stat {
  percentage: number;
  decayRate: number;
}

interface GameState {
  stats: {
    hunger: Stat;
    thirst: Stat;
    boredom: Stat;
    fatigue: Stat;
    fear: Stat;
  };
  inventory: {
    food: number;
    water: number;
  };
  pendingTasks: { actionKey: ActionKey; actionType: ActionType; startTime: number; duration: number }[];
}

const initialState = (): GameState => ({
  stats: {
    hunger: { percentage: 99, decayRate: 0.5 },
    thirst: { percentage: 74, decayRate: 0.3 },
    boredom: { percentage: 49, decayRate: 0.2 },
    fatigue: { percentage: 24, decayRate: 0.1 },
    fear: { percentage: 5, decayRate: 0.05 },
  },
  inventory: {
    food: 10,
    water: 10,
  },
  pendingTasks: [],
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    adjustValue(actionKey: keyof GameState['stats'], amount: number, max = 100, min = 0) {
      const stat = this.stats[actionKey];
      stat.percentage = Math.min(Math.max(stat.percentage + amount, min), max);
    },

    scheduleTask(actionKey: keyof GameState['stats'], actionType: ActionType, amount: number, duration = 10000) {
      const startTime = Date.now();
      const task = { actionKey, actionType, startTime, duration };
      this.pendingTasks.push(task);
    },

    listenForEvents() {
      emitter.on('actionStarted', ({ actionKey, actionType }) => {
        this.scheduleTask(actionKey as keyof GameState['stats'], actionType, 1);
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
              const statKey = task.actionKey as keyof GameState['stats'];
              if (task.actionType === 'increase') {
                this.adjustValue(statKey, 5);
              } else {
                this.adjustValue(statKey, -5);
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

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
  pendingActions: { actionKey: ActionKey; actionType: ActionType; startTime: number; duration: number }[];
}

const initialState = (): GameState => ({
  stats: {
    hunger: { percentage: 99, decayRate: 0.5 },
    thirst: { percentage: 74, decayRate: 0.3 },
    boredom: { percentage: 49, decayRate: 0.2 },
    fatigue: { percentage: 24, decayRate: 0.1 },
    fear: { percentage: 15, decayRate: -0.1 },
  },
  inventory: {
    food: 10,
    water: 10,
  },
  pendingActions: [],
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    adjustValue(actionKey: keyof GameState['stats'], amount: number, max = 100, min = 0) {
      const stat = this.stats[actionKey];
      stat.percentage = Math.min(Math.max(stat.percentage + amount, min), max);
    },

    scheduleAction(actionKey: keyof GameState['stats'], actionType: ActionType, amount: number, duration = 10000) {
      const startTime = Date.now();
      const action = { actionKey, actionType, startTime, duration };
      this.pendingActions.push(action);
    },

    listenForEvents() {
      emitter.on('actionStarted', ({ actionKey, actionType }) => {
        this.scheduleAction(actionKey as keyof GameState['stats'], actionType, 1);
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
    
          //progress actions
          this.pendingActions = this.pendingActions.filter(action => {
            const elapsed = now - action.startTime;
            const progress = Math.min((elapsed / action.duration) * 100, 100);
            emitter.emit('actionProgressed', { actionKey: action.actionKey, progress });
    
            if (progress >= 100) {
              const statKey = action.actionKey as keyof GameState['stats'];
              if (action.actionType === 'increase') {
                this.adjustValue(statKey, 5);
              } else {
                this.adjustValue(statKey, -5);
              }
              emitter.emit('actionCompleted', { actionKey: action.actionKey });
              return false;
            }
            return true;
          });
    
          //decay stats
          Object.keys(this.stats).forEach(statKey => {
            const key = statKey as keyof GameState['stats'];
            const stat = this.stats[key];
    
            const decayAmount = stat.decayRate * (delta / 1000);
            this.adjustValue(key, decayAmount);
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

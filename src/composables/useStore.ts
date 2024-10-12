import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { ActionKey, ActionType } from '../utilities/actions';

interface Stat {
  percentage: number;
  decayRate: number;
}

interface Ghost {
  name: string;
  state: GhostState;
  isActive: boolean;
  activeRoom: string | null;
}

type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';

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
  ghosts: {
    poltergeist: Ghost;
    orb: Ghost;
    wraith: Ghost;
    spirit: Ghost;
    phantom: Ghost;
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
  ghosts: {
    poltergeist: { state: 'Befriended', name: 'P', isActive: false, activeRoom: null },
    orb: { state: 'Communicated', name: 'O', isActive: false, activeRoom: null },
    wraith: { state: 'Identified', name: 'W', isActive: false, activeRoom: null },
    spirit: { state: 'Encountered', name: 'S', isActive: false, activeRoom: null },
    phantom: { state: 'Unknown', name: 'P', isActive: false, activeRoom: null },
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
    
          const ghostKeys = Object.keys(this.ghosts) as Array<keyof GameState['ghosts']>;
          const activeGhost = ghostKeys.find(key => this.ghosts[key].isActive === true);
    
          if (!activeGhost) {
            const randomGhostKey = ghostKeys[Math.floor(Math.random() * ghostKeys.length)];
            const randomDuration = Math.random() * (15000 - 5000) + 5000;
    
            this.activateGhost(randomGhostKey, randomDuration);
          }
    
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
    
    activateGhost(ghostKey: keyof GameState['ghosts'], duration: number) {
      const rooms = ['Bathroom', 'Bedroom', 'Cellar', 'Den', 'Kitchen', 'LivingRoom', 'Sunroom'];
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      
      this.ghosts[ghostKey].isActive = true;
      this.ghosts[ghostKey].activeRoom = randomRoom;
    
      setTimeout(() => {
        this.ghosts[ghostKey].isActive = false;
        this.ghosts[ghostKey].activeRoom = null;
      }, duration);
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

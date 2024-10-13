import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { ActionKey, GameState } from '../utilities/types';

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
    poltergeist: { state: 'Befriended', name: 'Polty', isActive: false, activeRoom: null, activeDuration: null, activationStart: null },
    orb: { state: 'Communicated', name: 'O', isActive: false, activeRoom: null, activeDuration: null, activationStart: null },
    wraith: { state: 'Identified', name: 'W', isActive: false, activeRoom: null, activeDuration: null, activationStart: null },
    spirit: { state: 'Encountered', name: 'S', isActive: false, activeRoom: null, activeDuration: null, activationStart: null },
    phantom: { state: 'Unknown', name: 'P', isActive: false, activeRoom: null, activeDuration: null, activationStart: null },
  },
  pendingActions: [],
  log: [],
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    adjustValue(actionKey: ActionKey, amount: number, max = 100, min = 0) {
      if (actionKey in this.stats) {
        const stat = this.stats[actionKey as keyof GameState['stats']];
        stat.percentage = Math.min(Math.max(stat.percentage + amount, min), max);
      } 
      else if (actionKey in this.inventory) {
        console.log('adjustValue', actionKey, amount, max, min);
        const inventoryItem = this.inventory[actionKey as keyof GameState['inventory']];
        this.inventory[actionKey as keyof GameState['inventory']] = Math.min(Math.max(inventoryItem + amount, min), max);
      } else {
        console.warn(`Invalid actionKey: ${actionKey}`);
      }
    },
  
    updateTime(deltaTime: number) {
       //1 day takes 15 mins
      const realWorldMillisecondsPerInGameMinute = 625;
      let inGameMinutesPassed = deltaTime / realWorldMillisecondsPerInGameMinute;
    
      this.calendar.accumulatedTime = (this.calendar.accumulatedTime || 0) + inGameMinutesPassed;
    
      while (this.calendar.accumulatedTime >= 1) {
        this.calendar.minutes += 1;
        this.calendar.accumulatedTime -= 1;
      }
      
      if (this.calendar.minutes >= 60) {
        this.calendar.hours += Math.floor(this.calendar.minutes / 60);
        this.calendar.minutes = this.calendar.minutes % 60;
      }
    
      if (this.calendar.hours >= 24) {
        this.calendar.days += Math.floor(this.calendar.hours / 24);
        this.calendar.hours = this.calendar.hours % 24;
      }
    },    

    scheduleAction(actionKey: ActionKey, amount: number, duration = 10000) {
      const startTime = Date.now();
      const action = { actionKey, amount, startTime, duration };
      this.pendingActions.push(action);
    },

    listenForEvents() {
      emitter.on('actionStarted', ({ actionKey, amount }) => {
        this.scheduleAction(actionKey, amount);
      });
    },

    reset() {
      Object.assign(this.$state, initialState());
    },

    clearLog() {
      this.log = [];
    },
  },
});

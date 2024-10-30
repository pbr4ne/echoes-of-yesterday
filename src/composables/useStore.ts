import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { ActionKey, InventoryKey, GameState } from '../utilities/types';

const initialState = (): GameState => ({
  stats: {
    hunger: { percentage: 99, decayRate: 0.5 },
    frailty: { percentage: 74, decayRate: 0.3 },
    boredom: { percentage: 49, decayRate: 0.2 },
    fatigue: { percentage: 24, decayRate: 0.1 },
    fear: { percentage: 14, decayRate: -0.1 },
  },
  inventory: {
    food: 10,
    water: 10,
  },
  ghosts: {
    poltergeist: { state: 'Banished', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }},
    orb: { state: 'Befriended', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }},
    wraith: { state: 'Communicated', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }},
    spirit: { state: 'Identified', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }},
    phantom: { state: 'Encountered', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }},
  },
  rooms: {
    living: { known: true, locked: false },
    kitchen: { known: true, locked: false },
    bedroom: { known: true, locked: false },
    sunroom: { known: true, locked: false },
    bathroom: { known: true, locked: false },
    den: { known: true, locked: false },
    cellar: { known: true, locked: true },
  },
  pendingActions: [],
  log: [],
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
  research: {
    sustenance: {
      sustenance1: { visible: true, known: true, complete: true },
      sustenance2: { visible: true, known: true, complete: true },
    },
    fitness: {
      fitness1: { visible: true, known: true, complete: true },
      fitness2: { visible: true, known: true, complete: false },
    },
    recreation: {
      recreation1: { visible: true, known: true, complete: false },
      recreation2: { visible: true, known: false, complete: false },
    },
    rest: {
      rest1: { visible: true, known: false, complete: false },
      rest2: { visible: true, known: false, complete: false },
    },
    paranormal: {
      paranormal1: { visible: true, known: false, complete: false },
      paranormal2: { visible: true, known: false, complete: false },
      paranormal3: { visible: true, known: false, complete: false },
      paranormal4: { visible: true, known: false, complete: false },
      paranormal5: { visible: true, known: false, complete: false },
      paranormal6: { visible: true, known: false, complete: false },
      paranormal7: { visible: true, known: false, complete: false },
      paranormal8: { visible: true, known: false, complete: false },
    },
  },
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    adjustValue(actionKey: ActionKey | InventoryKey, amount: number, max = 100, min = 0) {
      if (this.isActionKey(actionKey)) {
        const stat = this.stats[actionKey];
        stat.percentage = Math.min(Math.max(stat.percentage + amount, min), max);
      } 
      else if (this.isInventoryKey(actionKey)) {
        const inventoryItem = this.inventory[actionKey];
        this.inventory[actionKey] = Math.min(Math.max(inventoryItem + amount, min), max);
      } else {
        console.warn(`Invalid actionKey: ${actionKey}`);
      }
    },

    isActionKey(key: ActionKey | InventoryKey): key is ActionKey {
      return key in this.stats;
    },
    isInventoryKey(key: ActionKey | InventoryKey): key is InventoryKey {
      return key in this.inventory;
    },
  
    updateTime(deltaTime: number) {
       //1 day takes 15 mins
      const realWorldMillisecondsPerInGameMinute = 625;
      let inGameMinutesPassed = deltaTime / realWorldMillisecondsPerInGameMinute;
    
      this.calendar.accumulatedTime = (this.calendar.accumulatedTime ?? 0) + inGameMinutesPassed;
    
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

    scheduleAction(actionKey: ActionKey | InventoryKey, amount: number, duration = 10000) {
      const startTime = Date.now();
      const action = { actionKey, amount, startTime, duration };
      this.pendingActions.push(action);
    },

    scheduleResearch(researchKey: string, duration = 10000) {
      const startTime = Date.now();
      
      const scheduleRecursive = (node: any): boolean => {
        if (node[researchKey]) {
          console.log('scheduling research', researchKey, startTime, duration);
          node[researchKey].startTime = startTime;
          node[researchKey].duration = duration;
          return true;
        }
        if (node.children) {
          return Object.values(node.children).some(child => scheduleRecursive(child));
        }
        return false;
      };
    
      Object.values(this.research).forEach(group => {
        scheduleRecursive(group);
      });
    },    

    completeResearch(researchKey: string) {
      const completeRecursive = (node: any): boolean => {
        if (node[researchKey]) {
          node[researchKey].complete = true;
          node[researchKey].startTime = undefined;
          node[researchKey].duration = undefined;
          return true;
        }
        if (node.children) {
          return Object.values(node.children).some(child => completeRecursive(child));
        }
        return false;
      };
    
      Object.values(this.research).forEach(group => {
        completeRecursive(group);
      });
    },
    

    listenForEvents() {
      emitter.on('actionStarted', ({ actionKey, amount }) => {
        this.scheduleAction(actionKey, amount);
      });

      emitter.on('researchStarted', ({ researchKey }) => {
        this.scheduleResearch(researchKey);
      });
    },

    reset() {
      Object.assign(this.$state, initialState());
      localStorage.removeItem(this.$id);
    },

    clearLog() {
      this.log = [];
    },
  },
});

import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { useTime } from '../composables/useTime';
import { ActionKey, DeviceKey, GhostKey, InventoryKey, GameState, OneTimeAction, PersistentAction } from '../utilities/types';
import { useDevices } from '../composables/useDevices';
import { useGhosts } from '../composables/useGhosts';

const defaultDeviceInteractions = (): Record<DeviceKey, number> => ({
	teaLeaves: 0,
	tv: 0,
  shrine: 0,
  blackLight: 0,
  ghostBook: 0,
});

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
    poltergeist: { state: 'Encountered', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }, deviceInteractions: defaultDeviceInteractions()},
    orb: { state: 'Encountered', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }, deviceInteractions: defaultDeviceInteractions()},
    wraith: { state: 'Encountered', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }, deviceInteractions: defaultDeviceInteractions()},
    spirit: { state: 'Encountered', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }, deviceInteractions: defaultDeviceInteractions()},
    phantom: { state: 'Encountered', active: { isActive: false, activeRoom: null, activeDuration: null, activationStart: null }, deviceInteractions: defaultDeviceInteractions()},
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
  pendingOneTimeActions: [],
  pendingPersistentActions: [],
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

    isActionKey(key: ActionKey | InventoryKey ): key is ActionKey {
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

    scheduleOneTimeAction(oneTimeAction: OneTimeAction) {
      const { gameNow } = useTime();
      const startTime = gameNow();
      oneTimeAction.startTime = startTime;
      const activeGhost = (Object.keys(this.ghosts) as GhostKey[]).find(k => this.ghosts[k].active.isActive);
      if (activeGhost) {
        oneTimeAction.targetGhost = activeGhost;
      }
      this.pendingOneTimeActions.push(oneTimeAction);
    },

    schedulePersistentAction(persistentAction: PersistentAction) {
      this.pendingPersistentActions.push(persistentAction);
    },

    scheduleResearch(researchKey: string, duration = 10000) {
      const { gameNow } = useTime();
      const startTime = gameNow();
      
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

    updateGhostStateAfterInteraction(ghostKey: GhostKey, deviceKey: DeviceKey): void {
      const { ghostDeviceCommunication } = useDevices();
      const { knownGhosts } = useGhosts();
      const favDevice = knownGhosts.value.find(g => g.key === ghostKey)?.favouredDevice;

      const stepsForDevice = ghostDeviceCommunication[ghostKey].deviceCommunication[deviceKey]?.length ?? 0;
      if (stepsForDevice === 0) {
        return;
      }

      const g = this.ghosts[ghostKey];
      const progress = g.deviceInteractions[deviceKey];

      if (g.state === 'Encountered' &&
          deviceKey === favDevice &&
          progress   >= stepsForDevice) {
        g.state = 'Identified';
      }

      if (g.state === 'Identified') {
        const allDone = Object.entries(ghostDeviceCommunication[ghostKey].deviceCommunication)
          .every(([dKey, msgs]) =>
            g.deviceInteractions[dKey as DeviceKey] >= msgs.length
          );
        if (allDone) {
          g.state = 'Communicated';
        }
      }
    },

    listenForEvents() {
      emitter.on('oneTimeActionStarted', (oneTimeAction: OneTimeAction) => {
        this.scheduleOneTimeAction(oneTimeAction);
      });

      emitter.on('persistentActionStarted', (persistentAction: PersistentAction) => {
        this.schedulePersistentAction(persistentAction);
      });

      emitter.on('researchStarted', ({ researchKey }) => {
        this.scheduleResearch(researchKey);
      });

      emitter.on('deviceInteractedWith', ({ deviceKey, targetGhost }) => {
        if (deviceKey && targetGhost) {
          this.updateGhostStateAfterInteraction(targetGhost as GhostKey, deviceKey as DeviceKey);
        }  
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

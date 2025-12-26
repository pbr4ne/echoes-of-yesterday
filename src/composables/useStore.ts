import { defineStore } from 'pinia';
import { emitter } from '../utilities/emitter';
import { useTime } from '../composables/useTime';
import { ActionKey, DeviceKey, GhostKey, InventoryKey, StatKey, ResearchEffect, GameState, OneTimeAction, PersistentAction, RoomKey } from '../utilities/types';
import { researchEffects } from '../composables/useResearchEffects';
import { useDevices } from '../composables/useDevices';
import { useGhosts } from '../composables/useGhosts';

const defaultDeviceInteractions = (): Record<DeviceKey, number> => ({
  bed: 0,
  blackLight: 0,
  candles: 0,
  computer: 0,
  journal: 0,
  mirror: 0,
  mushrooms: 0,
  ouijaBoard: 0,
  radio: 0,
  shrine: 0,
  tarot: 0,
  teaKettle: 0,
  tv: 0,
  windChimes: 0
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
    vegetable: 0,
    fruit: 0,
    grain: 0,
    herb: 0,
    tea: 0,
    driedHerb: 0,
    driedTea: 0,
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
    cellar: { known: true, locked: false },
  },
  devices: {
    bed: { known: false, seen: false },
    blackLight: { known: false, seen: false },
    candles: { known: false, seen: false },
    computer: { known: false, seen: false },
    journal: { known: false, seen: false },
    mirror: { known: false, seen: false },
    mushrooms: { known: false, seen: false },
    ouijaBoard: { known: false, seen: false },
    radio: { known: false, seen: false },
    shrine: { known: false, seen: false },
    tarot: { known: false, seen: false },
    teaKettle: { known: false, seen: false },
    tv: { known: false, seen: false },
    windChimes: { known: false, seen: false },
  },
  pendingOneTimeActions: [],
  pendingPersistentActions: [],
  log: [],
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
  research: {
    sustenance: {
      herbalism: { visible: true, known: true, seen: false, complete: false },
      catFood: { visible: true, known: false, seen: false, complete: false },
      fruit: { visible: true, known: false, seen: false, complete: false },
      hungerCues: { visible: true, known: false, seen: false, complete: false },
      kitchenEfficiency: { visible: true, known: false, seen: false, complete: false },
      grains: { visible: true, known: false, seen: false, complete: false },
      satiety: { visible: true, known: false, seen: false, complete: false },
    },
    fitness: {
      calisthenics: { visible: true, known: true, seen: false, complete: false },
      catnip: { visible: true, known: false, seen: false, complete: false },
      kinesiology: { visible: true, known: false, seen: false, complete: false },
      weights: { visible: true, known: false, seen: false, complete: false },
      mobility: { visible: true, known: false, seen: false, complete: false },
      sprinting: { visible: true, known: false, seen: false, complete: false },
    },
    recreation: {
      puzzles: { visible: true, known: true, seen: false, complete: false },
      fun: { visible: true, known: false, seen: false, complete: false },
      catTricks: { visible: true, known: true, seen: false, complete: false },
      entertainmentTBD: { visible: true, known: false, seen: false, complete: false },
      lateralThinking: { visible: true, known: false, seen: false, complete: false },
      daydreaming: { visible: true, known: false, seen: false, complete: false },
    },
    rest: {
      sleepHygiene: { visible: true, known: true, seen: false, complete: false },
      catNapping: { visible: true, known: false, seen: false, complete: false },
      lucidDreams: { visible: true, known: false, seen: false, complete: false },
      deepRest: { visible: true, known: false, seen: false, complete: false },
      sheepTechnique: { visible: true, known: false, seen: false, complete: false },
    },
    paranormal: {
      smudging: { visible: true, known: true, seen: false, complete: false },
      divination: { visible: true, known: false, seen: false, complete: false },
      aeromancy: { visible: true, known: false, seen: false, complete: false },
      cartomancy: { visible: true, known: false, seen: false, complete: false },
      tasseomancy: { visible: true, known: false, seen: false, complete: false },
      iconomancy: { visible: true, known: false, seen: false, complete: false },
      seance: { visible: true, known: false, seen: false, complete: false },
      capnomancy: { visible: true, known: false, seen: false, complete: false },
      pyromancy: { visible: true, known: false, seen: false, complete: false },
      parapsychology: { visible: true, known: false, seen: false, complete: false },
      spiritBox: { visible: true, known: false, seen: false, complete: false },
      scrying: { visible: true, known: false, seen: false, complete: false },
      spectroscopy: { visible: true, known: false, seen: false, complete: false },
      astralProjection: { visible: true, known: false, seen: false, complete: false },
      entheogens: { visible: true, known: false, seen: false, complete: false },
      automaticWriting: { visible: true, known: false, seen: false, complete: false },
      hermetechnics: { visible: true, known: false, seen: false, complete: false },
    },
  },
  modifiers: {
    decayMult: {},
    decayAdd: {}
  },
  appliedResearch: new Set<string>() as Set<string>,
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
      const node = this.getResearchNode(researchKey);
      if (!node || !node.known || node.complete || node.startTime) {
        return false;
      }
      node.startTime = gameNow();
      node.duration = duration;
      return true;
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

    getEffectiveDecay(stat: StatKey): number {
      const base = this.stats[stat].decayRate;
      const mult = this.modifiers.decayMult[stat] ?? 1;
      const add  = this.modifiers.decayAdd[stat]  ?? 0;
      return base * mult + add;
    },

    applyResearchEffects(researchKey: string) {
      if (this.appliedResearch.has(researchKey)) return;

      const effects = researchEffects[researchKey] ?? [];

      (effects as ResearchEffect[]).forEach((e: ResearchEffect) => {
        switch (e.type) {
          case 'unlock_device':
            this.devices[e.device].known = true;
            break;
          case 'unlock_room':
            this.rooms[e.room].known = true;
            this.rooms[e.room].locked = false;
            break;
          case 'stat_decay_multiplier': {
            const cur = this.modifiers.decayMult[e.stat] ?? 1;
            this.modifiers.decayMult[e.stat] = cur * e.multiplier;
            break;
          }
          case 'stat_decay_add': {
            const cur = this.modifiers.decayAdd[e.stat] ?? 0;
            this.modifiers.decayAdd[e.stat] = cur + e.perSecond;
            break;
          }
          case 'unlock_research':
            this.unlockResearch(e.key);
            emitter.emit('researchUnlocked', { researchKey: e.key });
            break;
          }
      });

      this.appliedResearch.add(researchKey);
    },

    getResearchNode(researchKey: string): any | null {
      for (const group of Object.values(this.research) as any[]) {
        if (group[researchKey]) return group[researchKey];
      }
      return null;
    },

    unlockResearch(researchKey: string) {
      const node = this.getResearchNode(researchKey);
      if (!node) return;
      node.visible = true;
      node.known = true;
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

      emitter.on('researchCompleted', ({ researchKey }) => {
        this.completeResearch(researchKey);
        this.applyResearchEffects(researchKey);
      });
      
      emitter.on('deviceSeen', ({ deviceKey }) => {
        if (deviceKey) {
          this.devices[deviceKey as DeviceKey].seen = true;
        }
      });

      emitter.on('researchSeen', ({ researchKey }) => {
        const node = this.getResearchNode(researchKey);
        if (node) {
          node.seen = true;
        }
      });
    },

    unlockAll() {
      Object.keys(this.devices).forEach((deviceKey) => {
        this.devices[deviceKey as DeviceKey].known = true;
      });
      Object.keys(this.rooms).forEach((roomKey) => {
        this.rooms[roomKey as RoomKey].known = true;
        this.rooms[roomKey as RoomKey].locked = false;
      });
      Object.values(this.research).forEach(group => {
        Object.keys(group).forEach((researchKey) => {
          this.unlockResearch(researchKey);
        });
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

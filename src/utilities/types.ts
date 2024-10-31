import { DefineComponent } from 'vue';

export type ActionKey = 'hunger' | 'frailty' | 'boredom' | 'fatigue' | 'fear';
export type StatKey = 'hunger' | 'frailty' | 'boredom' | 'fatigue' | 'fear';
export type InventoryKey = 'food' | 'water';
export type GhostKey = 'poltergeist' | 'orb' | 'wraith' | 'spirit' | 'phantom';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';
export type RoomKey = 'living' | 'kitchen' | 'bedroom' | 'sunroom' | 'bathroom' | 'den' | 'cellar';
export type View = 'Rooms' | 'Research' | 'Profile';
export type ResearchKeys = 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';

export type Stats = Record<StatKey, Stat>;
export type Inventory = Record<InventoryKey, number>;
export type Ghosts = Record<GhostKey, Ghost>;
export type Rooms = Record<RoomKey, Room>;
export type ResearchGroup =  { [key: string]: Research; };

export interface Calendar {
  days: number;
  hours: number;
  minutes: number;
  accumulatedTime?: number;
}

export interface Stat {
  percentage: number;
  decayRate: number;
}

export interface Ghost {
  state: GhostState;
  active: {
    isActive: boolean;
    activeRoom: RoomKey | null;
    activeDuration: number | null;
    activationStart: number | null;
  };
}

export interface GhostDisplay extends Ghost {
  key: GhostKey,
  type: string,
  name: string,
  icon: DefineComponent,
  favouredRoom: RoomKey,
  favouredItem: string,
  description: string[],
}

export interface Room {
  known: boolean;
  locked: boolean;
}

export interface RoomDisplay extends Room {
  key: RoomKey;
  label: string;
  component: DefineComponent;
  icon: DefineComponent; 
}

export interface LogEntry {
  description: string;
  time: Calendar;
  room: RoomKey;
}

export interface Research {
  visible: boolean;
  known: boolean;
  complete: boolean;
  startTime?: number;
  duration?: number;
}

export interface Action {
  actionKey: ActionKey | InventoryKey;
  amount: number;
  startTime: number;
  duration: number;
}

export interface OneTimeAction {
  actionKey: string;
  label: string;
  duration: number;
  startTime?: number;
  affected: { key: StatKey | InventoryKey, amount: number }[];
}

export interface PersistentAction {
  actionKey: string;
  label: string;
  affected: { key: StatKey, amountPerSecond: number }[];
}

export type ActionGroup = { 
  title: string; 
  actions: (OneTimeAction | PersistentAction)[]; 
};

export interface GameState {
  stats: Stats;
  inventory: Inventory;
  ghosts: Ghosts;
  rooms: Rooms;
  calendar: Calendar;
  pendingActions: Action[];
  pendingOneTimeActions: OneTimeAction[];
  pendingPersistentActions: PersistentAction[];
  log: LogEntry[];
  research: {
    sustenance: ResearchGroup;
    fitness: ResearchGroup;
    recreation: ResearchGroup;
    rest: ResearchGroup;
    paranormal: ResearchGroup;
  };
}

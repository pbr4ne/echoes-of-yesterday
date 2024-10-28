import { shallowRef } from 'vue';

export type ActionKey = 'hunger' | 'frailty' | 'boredom' | 'fatigue' | 'fear';
export type InventoryKey = 'food' | 'water';
export type GhostKey = 'poltergeist' | 'orb' | 'wraith' | 'spirit' | 'phantom';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';
export type RoomKey = 'living' | 'kitchen' | 'bedroom' | 'sunroom' | 'bathroom' | 'den' | 'crawlspace';
export type View = 'Rooms' | 'Research' | 'Profile';
export type ResearchKeys = 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';
export type ResearchItemKeys = 'sustenance1' | 'sustenance2' | 'fitness1' | 'fitness2' | 'recreation1' | 'recreation2' | 'rest1' | 'rest2' | 'paranormal1' | 'paranormal2' | 'paranormal3' | 'paranormal4' | 'paranormal5' | 'paranormal6' | 'paranormal7' | 'paranormal8';

export type Stats = Record<ActionKey, Stat>;
export type Inventory = Record<InventoryKey, number>;
export type Ghosts = Record<GhostKey, Ghost>;
export type Rooms = Record<RoomKey, Room>;
export type ResearchGroup =  { [key: string]: ResearchState; };
export type Research = Record<ResearchKeys, ResearchGroup>;

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
  icon: ReturnType<typeof shallowRef>,
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
  component: ReturnType<typeof shallowRef>;
  icon: ReturnType<typeof shallowRef>;
}

export interface LogEntry {
  description: string;
  time: Calendar;
  room: RoomKey;
}

export interface ResearchState {
  visible: boolean;
  known: boolean;
  complete: boolean;
  startTime?: number;
  duration?: number;
}

export interface ResearchDisplay {
  key: ResearchKeys;
  label: string;
  icon: any;
  level: number;
  progress: number;
  color: string;
}

export interface GameState {
  stats: Stats;
  inventory: Inventory;
  ghosts: Ghosts;
  rooms: Rooms;
  calendar: Calendar;
  pendingActions: { actionKey: ActionKey | InventoryKey; amount: number; startTime: number; duration: number }[];
  log: LogEntry[];
  research: {
    sustenance: ResearchGroup;
    fitness: ResearchGroup;
    recreation: ResearchGroup;
    rest: ResearchGroup;
    paranormal: ResearchGroup;
  };
}

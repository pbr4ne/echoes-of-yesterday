export type ActionKey = 'hunger' | 'frailty' | 'boredom' | 'fatigue' | 'fear' | 'food' | 'water';
export type GhostType = 'poltergeist' | 'orb' | 'wraith' | 'spirit' | 'phantom';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';
export type View = 'Rooms' | 'Research' | 'Profile';
export type ResearchKeys = 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';
export type ResearchItemKeys = 'sustenance1' | 'sustenance2' | 'fitness1' | 'fitness2' | 'recreation1' | 'recreation2' | 'rest1' | 'rest2' | 'paranormal1' | 'paranormal2' | 'paranormal3' | 'paranormal4' | 'paranormal5' | 'paranormal6' | 'paranormal7' | 'paranormal8';

export type Stats = Record<ActionKey, Stat>;
export type Inventory = Record<'food' | 'water', number>;
export type Ghosts = Record<GhostType, Ghost>;
export type ResearchGroup = Record<ResearchItemKeys, ResearchState>;
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
  isActive: boolean;
  activeRoom: string | null;
  activeDuration: number | null;
  activationStart: number | null;
}

export interface LogEntry {
  description: string;
  time: Calendar;
  room: string;
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
  calendar: Calendar;
  pendingActions: { actionKey: ActionKey; amount: number; startTime: number; duration: number }[];
  log: LogEntry[];
  research: Research;
}

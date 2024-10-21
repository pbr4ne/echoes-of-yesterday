export type ActionKey = 'hunger' | 'frailty' | 'boredom' | 'fatigue' | 'fear' | 'food' | 'water';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';
export type View = 'Rooms' | 'Research' | 'Profile';
export type ResearchKeys = 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';

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

export interface ResearchGroup {
  [key: string]: ResearchState;
}

export interface Research {
  sustenance: ResearchGroup;
  fitness: ResearchGroup;
  recreation: ResearchGroup;
  rest: ResearchGroup;
  paranormal: ResearchGroup;
}

export interface ResearchDisplayItem {
  key: keyof Research;
  label: string;
  icon: any;
  level: number;
  progress: number;
  color: string;
}

export interface GameState {
  stats: Record<ActionKey, Stat>;
  inventory: Record<'food' | 'water', number>;
  ghosts: Record<'poltergeist' | 'orb' | 'wraith' | 'spirit' | 'phantom', Ghost>;
  calendar: Calendar;
  pendingActions: { actionKey: ActionKey; amount: number; startTime: number; duration: number }[];
  log: LogEntry[];
  research: Research;
}

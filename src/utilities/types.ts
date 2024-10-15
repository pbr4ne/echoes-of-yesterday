export type ActionKey = 'hunger' | 'thirst' | 'boredom' | 'fatigue' | 'fear' | 'food' | 'water';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';

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
  name: string;
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

export interface Research {
  title: string;
  key: string;
  color: string;
  children?: Research[];
}

export interface GameState {
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
  calendar: Calendar;
  pendingActions: { actionKey: ActionKey; amount: number; startTime: number; duration: number }[];
  log: LogEntry[];
}
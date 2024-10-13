export type ActionKey = 'hunger' | 'thirst' | 'boredom' | 'fatigue' | 'fear' | 'food' | 'water';
export type ActionType = 'increase' | 'decrease';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';

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
  time: string;
  room: string;
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
  pendingActions: { actionKey: ActionKey; actionType: ActionType; startTime: number; duration: number }[];
  log: LogEntry[];
}
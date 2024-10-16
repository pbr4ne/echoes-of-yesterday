export type ActionKey = 'hunger' | 'thirst' | 'boredom' | 'fatigue' | 'fear' | 'food' | 'water';
export type GhostState = 'Unknown' | 'Encountered' | 'Identified' | 'Communicated' | 'Befriended' | 'Banished';
export type View = 'Rooms' | 'Research' | 'Profile';

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

export interface ResearchState {
  visible: boolean;
  known: boolean;
  complete: boolean;
}

export interface CombinedResearch {
  title: string;
  key: string;
  color: string;
  children: CombinedResearch[];
  visible: boolean;
  known: boolean;
  complete: boolean;
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
  research: {
    sustenance1: ResearchState;
    sustenance2: ResearchState;
    fitness1: ResearchState;
    fitness2: ResearchState;
    recreation1: ResearchState;
    recreation2: ResearchState;
    rest1: ResearchState;
    rest2: ResearchState;
    paranormal1: ResearchState;
    paranormal2: ResearchState;
    paranormal3: ResearchState;
    paranormal4: ResearchState;
    paranormal5: ResearchState;
    paranormal6: ResearchState;
    paranormal7: ResearchState;
    paranormal8: ResearchState;
  };
}
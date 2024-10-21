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

export interface StaticResearch {
  key: string;
  title: string;
  parent?: string;
  colorDark: string;
  colorLight?: string;
  children?: StaticResearch[];
}

export interface CombinedResearch {
  key: string;
  title: string;
  colorDark: string;
  colorLight?: string;
  children: CombinedResearch[];
  visible: boolean;
  known: boolean;
  complete: boolean;
}

export interface ResearchState {
  key?: string;
  visible: boolean;
  known: boolean;
  complete: boolean;
  startTime?: number;
  duration?: number;
}

export interface ResearchGroup {
  key: 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';
  researches: ResearchState[];
}

export interface GameState {
  stats: {
    hunger: Stat;
    frailty: Stat;
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
  research2: {
    sustenance: { 
      sustenance1: ResearchState;
      sustenance2: ResearchState;
     };
    fitness: { 
      fitness1: ResearchState;
      fitness2: ResearchState;
     };
    recreation: { 
      recreation1: ResearchState;
      recreation2: ResearchState;
     };
    rest: { 
      rest1: ResearchState;
      rest2: ResearchState;
     };
    paranormal: { 
      paranormal1: ResearchState;
      paranormal2: ResearchState;
      paranormal3: ResearchState;
      paranormal4: ResearchState;
      paranormal5: ResearchState;
      paranormal6: ResearchState;
      paranormal7: ResearchState;
      paranormal8: ResearchState;
     };
  };
  research: ResearchGroup[];
}

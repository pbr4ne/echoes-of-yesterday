import mitt from 'mitt';
import { View, PersistentAction, OneTimeAction } from './types';

type GameEvent = {
  //actions
  oneTimeActionStarted: OneTimeAction;
  oneTimeActionProgressed: { actionKey: string; progress: number };
  oneTimeActionCancelled: { actionKey: string };
  oneTimeActionCompleted: { actionKey: string };

  persistentActionStarted: PersistentAction;
  persistentActionCancelled: { actionKey: string };

  deviceInteractedWith: { deviceKey?: string; targetGhost?: string };

  researchStarted: { researchKey: string };
  researchCompleted: { researchKey: string };
  researchProgressed: { researchKey: string; progress: number };

  switchView: { view: View };

  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

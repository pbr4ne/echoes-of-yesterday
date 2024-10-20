import mitt from 'mitt';
import { ActionKey, View } from './types';

type GameEvent = {
  //actions
  actionCompleted: { actionKey: ActionKey };
  actionStarted: { actionKey: ActionKey, amount: number };
  actionCancelled: { actionKey: ActionKey };
  actionProgressed: { actionKey: ActionKey; progress: number };

  researchStarted: { researchKey: string };
  researchCompleted: { researchKey: string };
  researchProgressed: { researchKey: string; progress: number };

  switchView: { view: View };

  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

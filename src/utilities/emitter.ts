import mitt from 'mitt';
import { ActionKey } from './types';

type GameEvent = {
  //actions
  actionCompleted: { actionKey: ActionKey };
  actionStarted: { actionKey: ActionKey, amount: number };
  actionCancelled: { actionKey: ActionKey };
  actionProgressed: { actionKey: ActionKey; progress: number };

  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

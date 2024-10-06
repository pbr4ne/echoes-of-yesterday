import mitt from 'mitt';
import { ActionKey, ActionType } from './actions';

type GameEvent = {
  //actions
  actionCompleted: { actionKey: ActionKey };
  actionStarted: { actionKey: ActionKey, actionType: ActionType };
  actionCancelled: { actionKey: ActionKey };
  actionProgressed: { actionKey: ActionKey; progress: number };

  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

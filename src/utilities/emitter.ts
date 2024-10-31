import mitt from 'mitt';
import { ActionKey, InventoryKey, View, PersistentAction, OneTimeAction } from './types';

type GameEvent = {
  //actions
  actionStarted: { actionKey: ActionKey | InventoryKey, amount: number };
  actionProgressed: { actionKey: ActionKey | InventoryKey; progress: number };
  actionCancelled: { actionKey: ActionKey | InventoryKey };
  actionCompleted: { actionKey: ActionKey | InventoryKey };

  oneTimeActionStarted: OneTimeAction;
  oneTimeActionProgressed: { actionKey: string; progress: number };
  oneTimeActionCancelled: { actionKey: string };
  oneTimeActionCompleted: { actionKey: string };

  persistentActionStarted: PersistentAction;
  persistentActionCancelled: { actionKey: string };

  researchStarted: { researchKey: string };
  researchCompleted: { researchKey: string };
  researchProgressed: { researchKey: string; progress: number };

  switchView: { view: View };

  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

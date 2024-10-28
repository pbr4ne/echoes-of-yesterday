import mitt from 'mitt';
import { ActionKey, InventoryKey, View } from './types';

type GameEvent = {
  //actions
  actionCompleted: { actionKey: ActionKey | InventoryKey };
  actionStarted: { actionKey: ActionKey | InventoryKey, amount: number };
  actionCancelled: { actionKey: ActionKey | InventoryKey };
  actionProgressed: { actionKey: ActionKey | InventoryKey; progress: number };

  researchStarted: { researchKey: string };
  researchCompleted: { researchKey: string };
  researchProgressed: { researchKey: string; progress: number };

  switchView: { view: View };

  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

import mitt from 'mitt';

export type ActionType = 'increase' | 'decrease';

type GameEvent = {
  //actions
  actionCompleted: { key: string };
  actionStarted: { key: string, actionType: ActionType };
  actionCancelled: { key: string };
  actionProgressed: { key: string; progress: number };

  autosave: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

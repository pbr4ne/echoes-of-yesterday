import mitt from 'mitt';

type GameEvent = {
  taskProgress: { key: string; progress: number };
  autosave: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();

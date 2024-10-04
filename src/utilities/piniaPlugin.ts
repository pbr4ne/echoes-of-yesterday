import { PiniaPluginContext } from 'pinia';
import { emitter } from './emitter';

export const piniaPlugin = (context: PiniaPluginContext) => {
  const { store } = context;
  const savedState = localStorage.getItem(store.$id);

  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  const saveInterval = 30000;
  setInterval(() => {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
    console.log('saved to localStorage');
    emitter.emit('autosave', { timestamp: new Date(), storeId: store.$id });
  }, saveInterval);
};

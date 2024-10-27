import { useStore } from './useStore';

export const useInventory = () => {
  const gameStore = useStore();

  const inventory = gameStore.inventory;
  return {
    inventory,
  };
};

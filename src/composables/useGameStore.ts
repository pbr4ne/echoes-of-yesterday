import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const hunger = ref(100);
  const boredom = ref(100);
  const food = ref(0);

  const addFood = (amount: number) => {
    food.value += amount;
  };

  const decreaseHunger = (amount: number) => {
    hunger.value = Math.max(hunger.value - amount, 0);
  };

  const decreaseBoredom = (amount: number) => {
    boredom.value = Math.max(boredom.value - amount, 0);
  };

  return {
    hunger,
    boredom,
    food,
    addFood,
    decreaseHunger,
    decreaseBoredom,
  };
});
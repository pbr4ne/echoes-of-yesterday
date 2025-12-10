<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Stove',
    actions: [
      { actionKey: 'tomatoSageSoup', label: 'Tomato & Sage Soup', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'potatoCarrotHash', label: 'Potato & Carrot Hash', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'lemonGingerStirFry', label: 'Lemon Ginger Stir Fry', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'rootVeggieStew', label: 'Root Veggie Stew', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      //{ actionKey: 'persistentCook', label: 'Persistent Cook', affected: [{ key: 'fatigue', amountPerSecond: -1 }] },
    ],
  },
  {
    title: 'Radio',
    actions: [
      { actionKey: 'listenToMusic', label: 'Listen to Music', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
    ],
  },
  {
    title: 'Prep Counter',
    actions: [
      { actionKey: 'strawberryFigTart', label: 'Strawberry & Fig Tart', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'lemonSunflowerSeedLoaf', label: 'Lemon Sunflower Seed Loaf', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'carrotSunflowerSalad', label: 'Carrot Sunflower Salad', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'sourdoughBread', label: 'Sourdough Bread', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
    ],
  },
  {
    title: 'Tea Kettle',
    actions: [
      { actionKey: 'blackTea', label: 'Black Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'chamomileTea', label: 'Chamomile Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'gingerLemonTea', label: 'Ginger Lemon Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'lavenderFigTea', label: 'Lavender Fig Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
    ],
  },

  // {
  //   title: 'Interactions',
  //   actions: [
  //     { actionKey: 'ouijaBoard', label: 'Use Planchette', duration: 1000, deviceKey: 'ouijaBoard', affected: [] },
  //     { actionKey: 'tv', label: 'Watch Static', duration: 1000, deviceKey: 'tv', affected: [] },
  //     { actionKey: 'blackLight', label: 'Use Black Light', duration: 1000, deviceKey: 'blackLight', affected: [] },
  //   ],
  // },
  // {
  //   title: 'Interactions',
  //   actions: [
  //     { actionKey: 'shrine', label: 'Use Shrine', duration: 1000, deviceKey: 'shrine', affected: [] },
  //     { actionKey: 'ghostBook', label: 'Write in Ghost Book', duration: 1000, deviceKey: 'ghostBook', affected: [] },
  //   ],
  // }
];
</script>

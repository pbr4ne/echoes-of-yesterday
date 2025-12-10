<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Vegetable Beds',
    actions: [
      { actionKey: 'gatherTomato', label: 'Tomato', duration: 10000, affected: [{ key: 'tomato', amount: 1 }] },
      { actionKey: 'gatherPotato', label: 'Potato', duration: 10000, affected: [{ key: 'potato', amount: 1 }] },
      { actionKey: 'gatherCarrot', label: 'Carrot', duration: 10000, affected: [{ key: 'carrot', amount: 1 }] },
    ],
  },
  {
    title: 'Hanging Planters',
    actions: [
      { actionKey: 'gatherTea', label: 'Tea', duration: 10000, affected: [{ key: 'tea', amount: 1 }] },
      { actionKey: 'gatherSage', label: 'Sage', duration: 10000, affected: [{ key: 'sage', amount: 1 }] },
      { actionKey: 'gatherGinger', label: 'Ginger', duration: 10000, affected: [{ key: 'ginger', amount: 1 }] },
    ],
  },  
  {
    title: 'Fruit Pots',
    actions: [
      { actionKey: 'gatherStrawberry', label: 'Strawberry', duration: 10000, affected: [{ key: 'strawberry', amount: 1 }] },
      { actionKey: 'gatherLemon', label: 'Lemon', duration: 10000, affected: [{ key: 'lemon', amount: 1 }] },
      { actionKey: 'gatherFig', label: 'Fig', duration: 10000, affected: [{ key: 'fig', amount: 1 }] },
    ],
  },
  {
    title: 'Window Boxes',
    actions: [
      { actionKey: 'gatherSunflower', label: 'Sunflower', duration: 10000, affected: [{ key: 'sunflower', amount: 1 }] },
      { actionKey: 'gatherChamomile', label: 'Chamomile', duration: 10000, affected: [{ key: 'chamomile', amount: 1 }] },
      { actionKey: 'gatherLavender', label: 'Lavender', duration: 10000, affected: [{ key: 'lavender', amount: 1 }] },
    ],
  },
  {
    title: 'Window',
    actions: [
      { actionKey: 'listenToWindChimes', label: 'Listen to Wind Chimes', duration: 10000, deviceKey: 'windChimes', affected: [] },
      { actionKey: 'readThermometer', label: 'Read Thermometer', duration: 10000, deviceKey: 'thermometer', affected: [] },
    ],
  }
];
</script>

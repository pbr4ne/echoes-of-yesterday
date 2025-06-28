<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Fridge',
    actions: [
      { actionKey: 'stareAtFood', label: 'Gather ingredients', duration: 10000, affected: [{ key: 'food', amount: 1 }] },
      { actionKey: 'persistentCook', label: 'Persistent Cook', affected: [{ key: 'fatigue', amountPerSecond: -1 }] },
    ],
  },
  {
    title: 'Interactions',
    actions: [
      { actionKey: 'teaLeaves', label: 'Read Tea Leaves', duration: 1000, deviceKey: 'teaLeaves', affected: [] },
      { actionKey: 'tv', label: 'Watch Static', duration: 1000, deviceKey: 'tv', affected: [] },
      { actionKey: 'blackLight', label: 'Use Black Light', duration: 1000, deviceKey: 'blackLight', affected: [] },
    ],
  },
  {
    title: 'Interactions',
    actions: [
      { actionKey: 'shrine', label: 'Use Shrine', duration: 1000, deviceKey: 'shrine', affected: [] },
      { actionKey: 'ghostBook', label: 'Write in Ghost Book', duration: 1000, deviceKey: 'ghostBook', affected: [] },
    ],
  }
];
</script>

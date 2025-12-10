<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Corner',
    actions: [
      { actionKey: 'liftWeights', label: 'Lift Weights', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
      { actionKey: 'cleanEctoplasm', label: 'Clean Ectoplasm', duration: 10000, deviceKey: 'ectoplasm', affected: [] },
    ],
  },
  {
    title: 'Shelves',
    actions: [
      { actionKey: 'sortBoxes', label: 'Sort Boxes', duration: 10000, affected: [{ key: 'boredom', amount: -10 }, { key: 'frailty', amount: -10 }] },
      { actionKey: 'useOuijaBoard', label: 'Use Ouija Board', duration: 10000, deviceKey: 'ouijaBoard', affected: [] },
    ],
  },
];
</script>

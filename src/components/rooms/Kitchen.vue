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
  }
];
</script>

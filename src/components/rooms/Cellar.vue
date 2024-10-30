<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionKey, InventoryKey } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: { title: string, actions: { actionKey: ActionKey | InventoryKey, amount: number, label: string }[] }[] = [
{
    title: 'Test',
    actions: [
      { actionKey: 'food', amount: 1, label: 'Test' },
    ]
  },
];
</script>

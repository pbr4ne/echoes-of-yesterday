<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionKey, InventoryKey } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
{
    title: 'Test',
    actions: [
      { actionKey: 'test', label: 'Test', duration: 10000, affected: [{ key: 'food', amount: 1 }] },
    ],
  },
];
</script>

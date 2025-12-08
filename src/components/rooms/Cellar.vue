<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
{
    title: 'Test',
    actions: [
      { actionKey: 'stareAtFood', label: 'Test', duration: 10000, affected: [{ key: 'food', amount: 1 }] },
    ],
  },
];
</script>

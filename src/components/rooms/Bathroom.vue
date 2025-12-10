<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Bathtub',
    actions: [
      { actionKey: 'bathe', label: 'Bathe', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
      { actionKey: 'readBook', label: 'Read Book', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'sensoryDeprivation', label: 'Sensory Deprivation', duration: 10000, deviceKey: 'bathtub', affected: [] },
    ],
  },
  {
    title: 'Vanity',
    actions: [
      { actionKey: 'readSigils', label: 'Read Mirror Sigils', duration: 10000, deviceKey: 'mirror', affected: [] },
    ],
  },
];
</script>

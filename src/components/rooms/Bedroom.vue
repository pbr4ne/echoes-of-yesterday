<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Bed',
    actions: [
      { actionKey: 'nap', label: 'Nap', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
      { actionKey: 'sleep', label: 'Sleep', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
      { actionKey: 'read', label: 'Read', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'watchStatic', label: 'Watch Static', duration: 10000, deviceKey: 'tv', affected: [] },
    ],
  },
  {
    title: 'Room',
    actions: [
      { actionKey: 'useBlackLight', label: 'Use Black Light', duration: 10000, deviceKey: 'blackLight', affected: [] },
      { actionKey: 'lightCandles', label: 'Light Candles', duration: 10000, deviceKey: 'candles', affected: [] },
      { actionKey: 'doCalisthenics', label: 'Do Calisthenics', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
    ],
  },
];
</script>

<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Television',
    actions: [
      { actionKey: 'watchTV', label: 'Watch TV', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'doTaebo', label: 'Do Taebo', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
      { actionKey: 'stareAtStatic', label: 'Stare At Static', duration: 10000, deviceKey: 'tv', affected: [] },
    ],
  },
  {
    title: 'Chesterfield',
    actions: [
      { actionKey: 'doze', label: 'Doze', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
      { actionKey: 'readMagazine', label: 'Read Magazine', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
    ],
  },
  {
    title: 'Fireplace',
    actions: [
      { actionKey: 'stokeFire', label: 'Stoke Fire', duration: 10000, affected: [{key: 'frailty', amount: -10}] },
      { actionKey: 'studyFlames', label: 'Study Flames', duration: 10000, deviceKey: 'fireplace', affected: [] },
    ],
  },
];
</script>

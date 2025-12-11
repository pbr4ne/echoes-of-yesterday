<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Stove',
    actions: [
      { actionKey: 'eatSoup', label: 'Make Soup', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'eatStew', label: 'Prepare Stew', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'eatHash', label: 'Sauté Hash', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      //{ actionKey: 'persistentCook', label: 'Persistent Cook', affected: [{ key: 'fatigue', amountPerSecond: -1 }] },
    ],
  },
  {
    title: 'Radio',
    actions: [
      { actionKey: 'listenToMusic', label: 'Listen to Music', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'listenToVoices', label: 'Listen to Voices', duration: 10000, deviceKey: 'radio', affected: [] },
    ],
  },
  {
    title: 'Counter',
    actions: [
      { actionKey: 'eatSalad', label: 'Mix Salad', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'eatPorridge', label: 'Stir Porridge', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'eatBread', label: 'Bake Bread', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
    ],
  },
  {
    title: 'Tea Kettle',
    actions: [
      { actionKey: 'blackTea', label: 'Steep Black Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }, { key: 'fatigue', amount: -10 }] },
      { actionKey: 'herbalTea', label: 'Infuse Herbal Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      { actionKey: 'readTeaLeaves', label: 'Read Tea Leaves', duration: 10000, deviceKey: 'teaLeaves', affected: [] },
    ],
  },
];
</script>

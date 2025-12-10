<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
  {
    title: 'Bookshelf',
    actions: [
      { actionKey: 'readNovel', label: 'Read Novel', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'solvePuzzleBook', label: 'Solve Puzzle Book', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'lookAtGhostBook', label: 'Look at Ghost Book', duration: 10000, deviceKey: 'ghostBook', affected: [] },
    ],
  },
  {
    title: 'Computer',
    actions: [
      { actionKey: 'readForums', label: 'Read Forums', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'playSolitaire', label: 'Play Solitaire', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      { actionKey: 'playComputerGame', label: 'Play Computer Game', duration: 10000, deviceKey: 'computerGame', affected: [] },
    ],
  },
];
</script>

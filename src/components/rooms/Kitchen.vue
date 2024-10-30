<template>
  <Room :actionGroups="actionGroups" />
</template>

<script setup lang="ts">
import { ActionKey, InventoryKey } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: { title: string, actions: { actionKey: ActionKey | InventoryKey, amount: number, label: string }[] }[] = [
  {
    title: 'Fridge',
    actions: [
      { actionKey: 'food', amount: 1, label: 'Gather ingredients' },
    ]
  },
  {
    title: 'Stove1',
    actions: [
      { actionKey: 'hunger', amount: -5, label: 'Cook food' },
      { actionKey: 'frailty', amount: -5, label: 'Boil Tea' },
    ]
  },
  {
    title: 'Stove2',
    actions: [
      { actionKey: 'hunger', amount: -5, label: 'Cook food' },
      { actionKey: 'frailty', amount: -5, label: 'Boil Tea' },
    ]
  },
  {
    title: 'Stov3e',
    actions: [
      { actionKey: 'hunger', amount: -5, label: 'Cook food' },
      { actionKey: 'frailty', amount: -5, label: 'Boil Tea' },
    ]
  },
  {
    title: 'Stove4',
    actions: [
      { actionKey: 'hunger', amount: -5, label: 'Cook food' },
      { actionKey: 'frailty', amount: -5, label: 'Boil Tea' },
    ]
  },
  {
    title: 'Stove5',
    actions: [
      { actionKey: 'hunger', amount: -5, label: 'Cook food' },
      { actionKey: 'frailty', amount: -5, label: 'Boil Tea' },
    ]
  },
];
</script>

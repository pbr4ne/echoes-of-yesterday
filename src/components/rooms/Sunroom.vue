<script setup lang="ts">
import { ActionGroup } from '../../utilities/types';
import Room from './Room.vue';

const actionGroups: ActionGroup[] = [
	{
		title: 'Garden Beds',
		actions: [
			{ actionKey: 'gatherVegetables', label: 'Harvest Vegetables', duration: 10000, affected: [{ key: 'vegetable', amount: 1 }] },
			{ actionKey: 'gatherFruit', label: 'Pick Fruit', duration: 10000, affected: [{ key: 'fruit', amount: 1 }] },
      { actionKey: 'gatherGrain', label: 'Reap Grain', duration: 10000, affected: [{ key: 'grain', amount: 1 }] },
		],
	},
	{
		title: 'Herb Trellis',
		actions: [
			{ actionKey: 'gatherHerbs', label: 'Pluck Herbs', duration: 10000, affected: [{ key: 'herb', amount: 1 }] },
			{ actionKey: 'gatherTea', label: 'Gather Tea Leaves', duration: 10000, affected: [{ key: 'tea', amount: 1 }] },
			{ actionKey: 'gatherSage', label: 'Snip Sage', duration: 10000, affected: [{ key: 'sage', amount: 1 }] },
		],
	},
	{
		title: 'Window Box',
		actions: [
			{ actionKey: 'tendToFlowers', label: 'Tend to Flowers', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
			{ actionKey: 'listenToWindChimes', label: 'Listen to Wind Chimes', duration: 10000, deviceKey: 'windChimes', affected: [] },
			{ actionKey: 'readThermometer', label: 'Read Thermometer', duration: 10000, deviceKey: 'thermometer', affected: [] },
		],
	},
];
</script>

<template>
	<Room :actionGroups="actionGroups" />
</template>

<template>
  <n-flex :size="[20, 20]">
    <n-card
      v-for="(card, cardIndex) in taskGroups"
      :key="cardIndex"
      :title="card.title"
      style="width: 200px; height: 200px;"
    >
      <n-flex vertical>
        <n-button
          v-for="task in card.tasks"
          :key="task.id"
          round
          :style="buttonProgressStyle(progress[task.id])"
          @click="startProgress(task.id)"
        >
          {{ task.label }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTasks } from '../../composables/useTasks';
import { useGameStore } from '../../composables/useGameStore';

const taskGroups = [
  {
    title: 'Fridge',
    tasks: [
      { id: 'fridge', label: 'Gather ingredients' }
    ]
  },
  {
    title: 'Stove',
    tasks: [
      { id: 'cook', label: 'Cook food' },
      { id: 'boil', label: 'Boil Tea' },
    ]
  },
];

const gameStore = useGameStore();

const handleTaskCompletion = (id: string) => {
  if (id === 'fridge') {
    gameStore.addFood(1);
    console.log('Food:', gameStore.food); 
  } else if (id === 'cook' && gameStore.food > 0) {
    gameStore.decreaseHunger(1);
    gameStore.addFood(-1);
    console.log('Hunger:', gameStore.hunger);
    console.log('Food:', gameStore.food);
  }
};

const { progress, startProgress, buttonProgressStyle } = useTasks(taskGroups, handleTaskCompletion);
</script>

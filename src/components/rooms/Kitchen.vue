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
          @click="startProgress(task)"
        >
          {{ task.label }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameLoop } from '../../composables/useGameLoop';

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

const taskIds = taskGroups.flatMap(card => card.tasks.map(task => task.id));

const progress = ref(Object.fromEntries(taskIds.map(id => [id, 0])));
const activeTask = ref(Object.fromEntries(taskIds.map(id => [id, false])));

const food = ref(0);
const hunger = ref(100);

const { subscribe } = useGameLoop();

subscribe((tick: number) => {
  taskIds.forEach((id) => {
    if (activeTask.value[id] && progress.value[id] < 100) {
      progress.value[id] += 1;
    }
    if (progress.value[id] >= 100) {
      activeTask.value[id] = false;
      progress.value[id] = 0;

      if (id === 'fridge') {
        food.value += 1;
        console.log('Food:', food.value); 
      } else if (id === 'cook' && food.value > 0) {
        hunger.value = Math.max(hunger.value - 1, 0); 
        food.value -= 1;
        console.log('Hunger:', hunger.value);
        console.log('Food:', food.value);
      }
    }
  });
});

const startProgress = (task: { id: keyof typeof progress.value }) => {
  if (progress.value[task.id] < 100) {
    activeTask.value[task.id] = true;
  }
};

const buttonProgressStyle = (progressValue: number) => ({
  backgroundImage: `linear-gradient(90deg, #43738B ${progressValue}%, transparent 0%)`,
  transition: 'background 0.3s'
});
</script>

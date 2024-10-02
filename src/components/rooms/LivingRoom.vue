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
    title: 'Television',
    tasks: [
      { id: 'television', label: 'Watch Reruns' }
    ]
  },
  {
    title: 'Couch',
    tasks: [
      { id: 'sitOnCouch', label: 'Sit on Couch' },
      { id: 'takeANap', label: 'Take a Nap' },
      { id: 'stareIntoSpace', label: 'Stare into Space' }
    ]
  },
  {
    title: 'Lamp',
    tasks: [
      { id: 'turnOnLamp', label: 'Turn on Lamp' },
      { id: 'doSomething', label: 'Do Something' }
    ]
  }
];

const gameStore = useGameStore();

const handleTaskCompletion = (id: string) => {
  if (id === 'television') {
    gameStore.decreaseBoredom(1);
    console.log('Boredom:', gameStore.boredom);
  }
};

const { progress, startProgress, buttonProgressStyle } = useTasks(taskGroups, handleTaskCompletion);
</script>


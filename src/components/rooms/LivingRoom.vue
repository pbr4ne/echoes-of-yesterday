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

const taskIds = taskGroups.flatMap(card => card.tasks.map(task => task.id));

const progress = ref(Object.fromEntries(taskIds.map(id => [id, 0])));
const activeTask = ref(Object.fromEntries(taskIds.map(id => [id, false])));

const boredom = ref(100);

const { subscribe } = useGameLoop();

subscribe((tick: number) => {
  taskIds.forEach((id) => {
    if (activeTask.value[id] && progress.value[id] < 100) {
      progress.value[id] += 1;
    }
    if (progress.value[id] >= 100) {
      activeTask.value[id] = false;
      progress.value[id] = 0;

      if (id === 'television') {
        boredom.value = Math.max(boredom.value - 1, 0); 
        console.log('Boredom:', boredom.value); 
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

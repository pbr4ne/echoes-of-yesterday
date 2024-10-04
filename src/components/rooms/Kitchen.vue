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
          :style="getButtonStyle(task.id)"
          @click="handleTask(task.id)"
        >
          {{ task.label }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';

const store = useStore();

const taskGroups: { title: string, tasks: { id: string, label: string }[] }[] = [
  {
    title: 'Fridge',
    tasks: [
      { id: 'food', label: 'Gather ingredients' },
    ]
  },
  {
    title: 'Stove',
    tasks: [
      { id: 'hunger', label: 'Cook food' },
      { id: 'thirst', label: 'Boil Tea' },
    ]
  },
];

const progressStyles = ref<{ [key: string]: string }>({});

const handleProgressUpdate = (event: { key: string; progress: number }) => {
  progressStyles.value[event.key] = `linear-gradient(90deg, #43738B ${event.progress}%, transparent 0%)`;
};

const handleTask = (taskId: string) => {
  store.scheduleTask(taskId, taskId === 'food' ? 'increase' : 'decrease', 1);
};

onMounted(() => {
  emitter.on('taskProgress', handleProgressUpdate);
});

onBeforeUnmount(() => {
  emitter.off('taskProgress', handleProgressUpdate);
});

const getButtonStyle = (taskId: string) => {
  return {
    backgroundImage: progressStyles.value[taskId],
    transition: 'background 0.3s',
  };
};
</script>

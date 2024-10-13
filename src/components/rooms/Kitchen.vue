<template>
  <n-flex :size="[20, 20]">
    <n-card
      class="flickerable"
      v-for="(card, cardIndex) in actionGroups"
      :key="cardIndex"
      :title="card.title"
      style="width: 200px; height: 200px;"
    >
      <n-flex vertical>
        <n-button
          v-for="action in card.actions"
          :key="action.actionKey"
          round
          :style="getButtonStyle(action.actionKey)"
          @click="startAction(action.actionKey)"
        >
          {{ action.label }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../../composables/useStore';
import { ActionKey } from '../../utilities/types';
import { emitter } from '../../utilities/emitter';

const store = useStore();

const actionGroups: { title: string, actions: { actionKey: ActionKey, label: string }[] }[] = [
  {
    title: 'Fridge',
    actions: [
      { actionKey: 'food', label: 'Gather ingredients' },
    ]
  },
  {
    title: 'Stove',
    actions: [
      { actionKey: 'hunger', label: 'Cook food' },
      { actionKey: 'thirst', label: 'Boil Tea' },
    ]
  },
];

const progressStyles = ref<{ [actionKey: string]: string }>({});

const handleActionProgressed = (event: { actionKey: ActionKey; progress: number }) => {
  progressStyles.value[event.actionKey] = `linear-gradient(90deg, #43738B ${event.progress}%, transparent 0%)`;
};

const handleActionCompleted = (event: {actionKey: ActionKey} ) => {
  progressStyles.value[event.actionKey] = '';
};

const startAction = (actionKey: ActionKey) => {
  emitter.emit('actionStarted', { actionKey, actionType: 'decrease' });
};

onMounted(() => {
  emitter.on('actionProgressed', handleActionProgressed);
  emitter.on('actionCompleted', handleActionCompleted);
});

onBeforeUnmount(() => {
  emitter.off('actionProgressed', handleActionProgressed);
});

const getButtonStyle = (actionKey: ActionKey) => {
  return {
    backgroundImage: progressStyles.value[actionKey],
    transition: 'background 0.3s',
  };
};
</script>

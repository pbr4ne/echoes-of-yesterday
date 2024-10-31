<template>
  <n-flex :size="[20, 20]" style="max-width: 640px;">
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
          @click="startAction(action)"
        >
          {{ action.label }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { ActionGroup, OneTimeAction, PersistentAction } from '../../utilities/types';
import { emitter } from '../../utilities/emitter';

const props = defineProps<{
  actionGroups: ActionGroup[]
}>();

const isOneTimeAction = (action: OneTimeAction | PersistentAction): action is OneTimeAction => {
  return 'duration' in action;
};

const isPersistentAction = (action: OneTimeAction | PersistentAction): action is PersistentAction => {
  return 'amountPerSecond' in action;
};

const progressStyles = ref<{ [actionKey: string]: string }>({});

const handleOneTimeActionProgressed = (event: { actionKey: string; progress: number }) => {
  progressStyles.value[event.actionKey] = `linear-gradient(90deg, #43738B ${event.progress}%, transparent 0%)`;
};

const handleOneTimeActionCompleted = (event: { actionKey: string }) => {
  progressStyles.value[event.actionKey] = '';
};

const startAction = (action: OneTimeAction | PersistentAction) => {
  if (isOneTimeAction(action)) {
    emitter.emit('oneTimeActionStarted', action);
  } else if (isPersistentAction(action)) {
    emitter.emit('persistentActionStarted', action);
  } else {
    console.error('Unknown action type', action);
  }
};

onMounted(() => {
  emitter.on('oneTimeActionProgressed', handleOneTimeActionProgressed);
  emitter.on('oneTimeActionCompleted', handleOneTimeActionCompleted);
});

onBeforeUnmount(() => {
  emitter.off('oneTimeActionProgressed', handleOneTimeActionProgressed);
  emitter.off('oneTimeActionCompleted', handleOneTimeActionCompleted);
});

const getButtonStyle = (actionKey: string) => {
  return {
    backgroundImage: progressStyles.value[actionKey],
    transition: 'background 0.3s',
  };
};
</script>

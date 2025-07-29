<template>
  <n-flex :size="[20, 20]" style="max-width: 640px;">
    <n-card
      class="flickerable"
      v-for="(card, cardIndex) in actionGroups"
      :key="cardIndex"
      :title="card.title"
      style="width: 200px; height: 200px;"
      v-show="cardHasVisibleActions(card)"
    >
      <n-flex vertical>
        <n-badge
					v-for="action in card.actions"
					:key="action.actionKey"
					:show="showBadge(action)"
					processing
          value="new"
					type="info"
					v-show="isVisibleAction(action)"
          :offset="[-140, 0]"
				>
					<n-button
						round
						:style="getButtonStyle(action.actionKey)"
						@click="startAction(action)"
            @mouseenter="deviceSeen(action)"
					>
						{{ action.label }}
					</n-button>
				</n-badge>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { ActionGroup, DeviceKey, GenericAction, OneTimeAction, PersistentAction } from '../../utilities/types';
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';

const props = defineProps<{ actionGroups: ActionGroup[] }>();

const store = useStore();

const isDeviceAction = (a: GenericAction): a is GenericAction & { deviceKey: DeviceKey } =>
	'deviceKey' in a && typeof (a as any).deviceKey === 'string';

const isVisibleAction = (a: GenericAction) => !isDeviceAction(a) || !!store.devices[a.deviceKey]?.known;

const showBadge = (a: GenericAction) => isDeviceAction(a) && store.devices[a.deviceKey]?.seen === false;

const cardHasVisibleActions = (card: ActionGroup) => card.actions.some(isVisibleAction);

const isOneTimeAction = (action: GenericAction): action is OneTimeAction =>  'duration' in action;

const isPersistentAction = (action: GenericAction): action is PersistentAction => !('duration' in action);

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

const deviceSeen = (a: GenericAction) => {
	if (isDeviceAction(a) && store.devices[a.deviceKey]?.seen === false) {
		emitter.emit('deviceSeen', { deviceKey: a.deviceKey });
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

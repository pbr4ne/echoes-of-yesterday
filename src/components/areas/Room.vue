<template>
  <n-flex :size="[20, 20]" style="max-width: 640px;">
    <n-card
      class="flickerable"
      v-for="(card, cardIndex) in actionGroups"
      :key="cardIndex"
      :style="getCardStyle(card)"
      v-show="cardHasVisibleActions(card)"
    >
      <template #header>
        <n-flex align="center" :wrap="false">
          <span>{{ card.title }}</span>
          <n-tooltip
            v-if="card.description"
            trigger="hover"
          >
            <template #trigger>
              <n-icon size="16" style="cursor: help;">
                <InfoCircleOutlined />
              </n-icon>
            </template>
            <span>{{ card.description }}</span>
          </n-tooltip>
        </n-flex>
      </template>

      <div class="card-content">
        <n-flex vertical>
          <n-badge
            v-for="action in card.actions"
            :key="action.actionKey"
            :show="showBadge(action)"
            processing
            value="new"
            type="info"
            v-show="isVisibleAction(action)"
            :offset="[-170, 0]"
          >
            <n-button
              round
              ghost
              :color="getButtonColour(action)"
              :style="getButtonStyle(action)"
              :disabled="isActionDisabled(action)"
              @click="startAction(action); unfocusButton($event);"
              @mouseenter="deviceSeen(action)"
            >
              {{ action.label }}
            </n-button>
          </n-badge>
        </n-flex>
        <cat :src="card.cat" v-if="card.cat"/>
      </div>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { ActionGroup, DeviceKey, GenericAction, OneTimeAction, PersistentAction, InventoryKey, StatKey, RoomKey } from '../../utilities/types';
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';
import { InfoCircleOutlined  } from '@vicons/antd';
import Cat from '../areas/Cat.vue';

const props = defineProps<{ roomKey: RoomKey; actionGroups: ActionGroup[] }>();

const actionMap = computed<Record<string, GenericAction>>(() => {
  const map: Record<string, GenericAction> = {};
  for (const group of props.actionGroups) {
    for (const action of group.actions) {
      map[action.actionKey] = action;
    }
  }
  return map;
});

const store = useStore();

function unfocusButton(event: Event) {
  const el = event.currentTarget as HTMLElement;
  requestAnimationFrame(() => el.blur());
}

const isDeviceAction = (a: GenericAction): a is GenericAction & { deviceKey: DeviceKey } =>
  'deviceKey' in a && typeof (a as any).deviceKey === 'string';

const isVisibleAction = (a: GenericAction) => !isDeviceAction(a) || !!store.devices[a.deviceKey]?.known;

const showBadge = (a: GenericAction) => isDeviceAction(a) && store.devices[a.deviceKey]?.seen === false;

const cardHasVisibleActions = (card: ActionGroup) => card.actions.some(isVisibleAction);

const isOneTimeAction = (action: GenericAction): action is OneTimeAction =>  'duration' in action;

const isPersistentAction = (action: GenericAction): action is PersistentAction => !('duration' in action);

const progressStyles = ref<{ [actionKey: string]: string }>({});

const getVisibleActionsCount = (card: ActionGroup) =>
  card.actions.filter(isVisibleAction).length;

const getCardStyle = (card: ActionGroup) => {
  const visibleCount = getVisibleActionsCount(card);
  const baseHeightPerAction = 50;
  const headerAndPadding = 60;
  const height = Math.max(130, headerAndPadding + visibleCount * baseHeightPerAction);

  return {
    width: '220px',
    height: `${height}px`,
  }
}

const handleOneTimeActionProgressed = (event: { actionKey: string; progress: number }) => {
  const action = actionMap.value[event.actionKey];
  const isDevice = action && isDeviceAction(action);

  const baseColor = isDevice ? '#5c1516' : '#43738B';

  progressStyles.value[event.actionKey] =
    `linear-gradient(90deg, ${baseColor} ${event.progress}%, transparent 0%)`;
};

const handleOneTimeActionCompleted = (event: { actionKey: string }) => {
  progressStyles.value[event.actionKey] = '';
};

const hasInventoryKey = (key: StatKey | InventoryKey): key is InventoryKey => {
  return key in store.inventory;
};

const isActionDisabled = (action: GenericAction): boolean => {
  if (!isOneTimeAction(action)) {
    return false;
  }

  for (const effect of action.affected) {
    if (effect.amount >= 0) {
      continue;
    }

    if (!hasInventoryKey(effect.key)) {
      continue;
    }

    const current = store.inventory[effect.key];
    if (current + effect.amount < 0) {
      return true;
    }
  }

  return false;
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

const getButtonColour = (action: GenericAction) => {
  if (isDeviceAction(action)) {
    return '#9c2c2d';
  }
  return null;
};

const getButtonStyle = (action: GenericAction) => {
  return {
    backgroundImage: progressStyles.value[action.actionKey],
    transition: 'background 0.3s',
  };
};
</script>

<style scoped>
  .card-content {
    position: relative;
  }


</style>

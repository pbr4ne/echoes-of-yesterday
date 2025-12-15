<template>
  <n-tabs
    v-model:value="name"
    type="card"
    size="small"
    tab-style="padding: 7px"
    animated
  >
    <n-tab-pane
      v-for="room in knownRooms"
      :key="room.key"
      :name="room.label"
      style="padding: 20px;"
      :disabled="room.locked"
    >
      <template #tab>
        <n-tooltip trigger="hover" :disabled="showText && !room.locked">
          <template #trigger>
            <n-icon :class="{ 'pulsate': isRoomActive(room.key) && !paused }" class="tab-icon">
              <component :is="room.locked ? RoomLocked : room.icon" />
            </n-icon>
          </template>
          <span>{{ room.locked ? 'Locked' : room.label }}</span>
        </n-tooltip>
        <n-tooltip v-if="showText" trigger="hover" :disabled="!room.locked">
          <template #trigger>
            <n-badge
              dot
              processing
              type="warning"
              :show="!room.locked && !!roomHasUnseenDevices[room.key]"
            >
              <span :class="{ 'pulsate': isRoomActive(room.key) && !paused }" class="tab-text">
                {{ room.label }}
              </span>
            </n-badge>
          </template>
          <span v-if="room.locked">Locked</span>
        </n-tooltip>
      </template>

      <Room :room-key="room.key" :action-groups="room.actionGroups" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { useRooms } from '../../composables/useRooms';
import { useTime } from '../../composables/useTime';
import RoomLocked from '@vicons/material/LockOutlined';
import type { RoomKey } from '../../utilities/types';
import Room from './Room.vue';

const { paused } = useTime();

const name = ref('Kitchen');

const { knownRooms } = useRooms();

const showText = ref(window.innerWidth > 650);

const updateShowText = () => {
  showText.value = window.innerWidth > 650;
};

onMounted(() => {
  window.addEventListener('resize', updateShowText);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateShowText);
});

const gameStore = useStore();

const isRoomActive = (roomName: RoomKey) => {
  return Object.values(gameStore.ghosts).some(ghost => ghost.active.activeRoom === roomName && ghost.active.isActive);
};

const roomHasUnseenDevices = computed(() => {
	const result: Partial<Record<RoomKey, boolean>> = {};

	for (const room of knownRooms.value) {
		const hasUnseen = room.actionGroups.some(group =>
			group.actions.some(action =>
				'actionKey' in action &&
				'deviceKey' in action &&
				action.deviceKey &&
				gameStore.devices[action.deviceKey]?.known &&
				!gameStore.devices[action.deviceKey]?.seen
			)
		);

		if (hasUnseen) {
			result[room.key] = true;
		}
	}

	return result;
});

</script>

<style scoped>
  .tab-icon {
    margin-right: 8px;
    font-size: 20px;
  }

  .tab-text {
    vertical-align: middle;
  }
</style>

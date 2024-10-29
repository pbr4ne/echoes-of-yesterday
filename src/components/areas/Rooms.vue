<template>
  <n-tabs
    v-model:value="name"
    type="card"
    size="small"
    tab-style="padding: 7px"
    animated
  >
    <n-tab-pane
      v-for="(room, index) in knownRooms"
      :key="room.key"
      :name="room.label"
      style="padding: 20px;"
      :disabled="room.locked"
    >
      <template #tab>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon :class="{ 'pulsate': isRoomActive(room.key) }" class="tab-icon">
              <component :is="room.locked ? RoomLocked : room.icon" />
            </n-icon>
          </template>
          <span v-if="room.locked">Locked</span>
        </n-tooltip>
        <n-tooltip v-if="showText" trigger="hover">
          <template #trigger>
            <span :class="{ 'pulsate': isRoomActive(room.key) }" class="tab-text">
              {{ room.label }}
            </span>
          </template>
          <span v-if="room.locked">Locked</span>
        </n-tooltip>
      </template>

      <component :is="room.component" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../../composables/useStore';
import { useRooms } from '../../composables/useRooms';
import RoomLocked from '@vicons/material/LockOutlined';

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

const isRoomActive = (roomName: string) => {
  return Object.values(gameStore.ghosts).some(ghost => ghost.active.activeRoom === roomName && ghost.active.isActive);
};
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

<template>
  <div v-for="(item, index) in sidebar" :key="item.key" class="sidebar-item">
    <n-icon size="24" class="sidebar-icon">
      <component :is="item.icon" />
    </n-icon>
    <div class="progress-wrapper">
      <n-progress
        v-if="!collapsed"
        :percentage="item.percentage"
        type="line"
        :height="20"
        :color="getProgressColor(item.percentage)"
        :show-indicator="false"
      />
      <div class="progress-label">
        <span class="progress-text" :style="{ color: getTextColor(item.percentage) }">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { FoodToast24Regular as HungerIcon } from '@vicons/fluent';
import { Coffee as ThirstIcon, DeviceTv as BoredomIcon } from '@vicons/tabler';
import { Sleep24Regular as FatigueIcon } from '@vicons/fluent';
import { ExclamationCircleOutlined as FearIcon } from '@vicons/antd';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const gameStore = useStore();

const sidebar = computed(() => [
  { label: 'Hunger', key: 'hunger', icon: HungerIcon, percentage: gameStore.hunger },
  { label: 'Thirst', key: 'thirst', icon: ThirstIcon, percentage: gameStore.thirst },
  { label: 'Boredom', key: 'boredom', icon: BoredomIcon, percentage: 74 },
  { label: 'Fatigue', key: 'fatigue', icon: FatigueIcon, percentage: 49 },
  { label: 'Fear', key: 'fear', icon: FearIcon, percentage: 5 }
]);

const getProgressColor = (percentage: number) => {
  if (percentage <= 25) {
    return '#43738B';
  } else if (percentage <= 50) {
    return '#4CAF50';
  } else if (percentage <= 75) {
    return '#FFC107';
  } else {
    return '#F44336';
  }
};

const getTextColor = (percentage: number) => {
  if (percentage > 50 && percentage <= 75) {
    return '#333639';
  }
  return '#FFFFFFD1';
};
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.sidebar-icon {
  margin-right: 8px;
}

.progress-wrapper {
  position: relative;
  flex-grow: 1;
  margin-left: 8px;
  width: 100%;
}

.progress-label {
  position: absolute;
  top: 0;
  left: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.n-progress {
  width: 100%;
}
</style>

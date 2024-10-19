<template>
  <div v-for="(item, index) in sidebar" :key="item.key" class="sidebar-item">
    <n-icon size="24" class="sidebar-icon">
      <component :is="item.icon" />
    </n-icon>
    <div class="progress-wrapper" v-if="!collapsed">
      <n-progress
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
import HungerIcon from '@vicons/tabler/Cheese';
import FrailtyIcon from '@vicons/tabler/Barbell';
import BoredomIcon from '@vicons/tabler/DeviceTv';
import FatigueIcon from '@vicons/fluent/Sleep24Regular';
import FearIcon from '@vicons/antd/ExclamationCircleOutlined';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const gameStore = useStore();

const sidebar = computed(() => [
  { label: 'Hunger', key: 'hunger', icon: HungerIcon, percentage: gameStore.stats.hunger.percentage },
  { label: 'Frailty', key: 'frailty', icon: FrailtyIcon, percentage: gameStore.stats.frailty.percentage },
  { label: 'Boredom', key: 'boredom', icon: BoredomIcon, percentage: gameStore.stats.boredom.percentage },
  { label: 'Fatigue', key: 'fatigue', icon: FatigueIcon, percentage: gameStore.stats.fatigue.percentage },
  { label: 'Fear', key: 'fear', icon: FearIcon, percentage: gameStore.stats.fear.percentage }
]);

const getProgressColor = (percentage: number) => {
  if (percentage <= 14) {
    return '#577590';
  } else if (percentage <= 28) {
    return '#43aa8b';
  } else if (percentage <= 42) {
    return '#90be6d';
  } else if (percentage <= 57) {
    return '#f9c74f';
  } else if (percentage <= 71) {
    return '#f8961e';
  } else if (percentage <= 85) {
    return '#f3722c';
  } else {
    return '#f94144';
  }
};

const getTextColor = (percentage: number) => {
  if (percentage <= 42) {
    return '#FFFFFFD1';
  }
  return '#333639';
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

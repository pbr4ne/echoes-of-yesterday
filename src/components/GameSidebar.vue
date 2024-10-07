<template>
  <n-space vertical size="medium" style="padding: 20px;">
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

    <n-divider />

    <div v-for="(ghost, index) in ghosts" :key="ghost.key" class="sidebar-item">
      <n-icon size="24" class="sidebar-icon">
        <component :is="ghost.icon" />
      </n-icon>
      <span class="ghost-label" style="padding-left: 10px;" v-if="!collapsed">
        {{ ghost.label }}
      </span>
      <n-tag :type="ghost.status == 'Communicated' ? 'warning' : 'info'" size="small" round v-if="!collapsed">
        {{ ghost.status }}
      </n-tag>
    </div>

    <n-divider />

    <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
      <n-icon size="24" class="sidebar-icon">
        <component :is="r.icon" />
      </n-icon>
      <span class="ghost-label" style="padding-left: 10px;" v-if="!collapsed">
        {{ r.label }}
      </span>
      <n-tag :bordered="false" type="info">
        {{ r.progress }}/10
      </n-tag>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../composables/useStore';
import { FoodToast24Regular as HungerIcon } from '@vicons/fluent';
import { Coffee as ThirstIcon, DeviceTv as BoredomIcon } from '@vicons/tabler';
import { Sleep24Regular as FatigueIcon } from '@vicons/fluent';
import { ExclamationCircleOutlined as FearIcon } from '@vicons/antd';
import { ChartBubble as OrbIcon } from '@vicons/tabler';
import { WindySnow as WraithIcon } from '@vicons/carbon';
import { Calibrate as PoltergeistIcon } from '@vicons/carbon';
import { Atom2 as SpiritIcon } from '@vicons/tabler';
import { AutoAwesomeOutlined as ApparitionIcon } from '@vicons/material';

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

const ghosts = computed(() => [
  { label: 'Poltergeist', key: 'poltergeist', icon: PoltergeistIcon, status: 'Encountered' },
  { label: 'Orb', key: 'orb', icon: OrbIcon, status: 'Encountered' },
  { label: 'Wraith', key: 'wraith', icon: WraithIcon, status: 'Encountered' },
  { label: 'Spirit', key: 'spirit', icon: SpiritIcon, status: 'Communicated' },
  { label: '???', key: 'apparition', icon: ApparitionIcon, status: 'Encountered' },
]);

const research = computed(() => [
  { label: 'Cooking', key: 'cooking', icon: FearIcon, progress: 1 },
  { label: 'Teamaking', key: 'teamaking', icon: FearIcon, progress: 3 },
  { label: 'Conjuration', key: 'conjuration', icon: FearIcon, progress: 8 },
  { label: 'Illusionary Visions', key: 'illusionaryVisions', icon: FearIcon, progress: 2 },
  { label: 'Meditation', key: 'meditation', icon: FearIcon, progress: 10 },
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

.ghost-label {
  flex-grow: 1;
}

.n-progress {
  width: 100%;
}

.n-tag {
  margin-left: auto;
}
</style>

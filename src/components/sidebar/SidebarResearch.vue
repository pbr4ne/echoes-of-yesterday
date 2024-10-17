<template>
  <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
    <n-icon size="24" class="sidebar-icon">
      <component :is="r.icon" />
    </n-icon>
    <span style="padding-left: 10px;" v-if="!collapsed">
      {{ r.label }}
    </span>
    <n-space style="margin-left:auto;" v-if="!collapsed">
      <n-progress type="circle" style="width: 30px;" :percentage="r.progress">
        <span class="research-level">{{ r.level }}</span>
      </n-progress>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { 
  BookTheta24Regular as SustenanceIcon,
  BookPulse24Regular as FitnessIcon,
  BookStar24Regular as EntertainmentIcon,
  BookClock24Regular as RestIcon,
  BookCompass24Regular as ParanormalIcon,
} from '@vicons/fluent';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const gameStore = useStore();

const countCompletedResearches = (type: string): number => {
  const researchGroup = gameStore.research.find(group => group.key === type);

  if (researchGroup) {
    return researchGroup.researches.filter(research => research.complete).length;
  } else {
    console.warn(`Research group with type ${type} not found.`);
    return 0;
  }
};
const calculateResearchProgress = (key: string): number => {
  const researchGroup = gameStore.research.find(group => group.key === key);

  if (researchGroup && researchGroup.startTime && researchGroup.duration) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - researchGroup.startTime;
    const progress = (elapsedTime / researchGroup.duration) * 100;

    return Math.min(progress, 100);
  } else {
    return 0;
  }
};

const research = computed(() => [
  {
    key: 'sustenance',
    label: 'Sustenance',
    icon: SustenanceIcon,
    level: countCompletedResearches('sustenance'),
    progress: calculateResearchProgress('sustenance'),
  },
  {
    key: 'fitness',
    label: 'Fitness',
    icon: FitnessIcon,
    level: countCompletedResearches('fitness'),
    progress: calculateResearchProgress('fitness'),
  },
  {
    key: 'recreation',
    label: 'Recreation',
    icon: EntertainmentIcon,
    level: countCompletedResearches('recreation'),
    progress: calculateResearchProgress('recreation'),
  },
  {
    key: 'rest',
    label: 'Rest',
    icon: RestIcon,
    level: countCompletedResearches('rest'),
    progress: calculateResearchProgress('rest'),
  },
  {
    key: 'paranormal',
    label: 'Paranormal',
    icon: ParanormalIcon,
    level: countCompletedResearches('paranormal'),
    progress: calculateResearchProgress('paranormal'),
  },
]);
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

.research-level {
  font-family: 'Marcellus', sans-serif;
  font-weight: 400;
  font-size: 16px;
}
</style>

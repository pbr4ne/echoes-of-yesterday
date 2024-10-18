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
import { markRaw, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';
import { 
  BookTheta24Regular as SustenanceIcon,
  BookPulse24Regular as FitnessIcon,
  BookStar24Regular as EntertainmentIcon,
  BookClock24Regular as RestIcon,
  BookCompass24Regular as ParanormalIcon,
} from '@vicons/fluent';

interface ResearchItem {
  key: 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';
  label: string;
  icon: any;
  level: number;
  progress: number;
}

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const gameStore = useStore();

const research = ref<ResearchItem[]>([]);

const updateResearchProgress = () => {
  research.value = gameStore.research.map(group => {
    const activeResearch = group.researches.find(research => research.startTime && research.duration);
  
    let progress = 0;
    if (activeResearch && activeResearch.startTime && activeResearch.duration) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - activeResearch.startTime;
      progress = (elapsedTime / activeResearch.duration) * 100;
    }

    return {
      key: group.key,
      label: group.key.charAt(0).toUpperCase() + group.key.slice(1),
      icon: getIconByGroup(group.key),
      level: group.researches.filter(research => research.complete).length,
      progress: Math.min(progress, 100),
    };
  });
};

const getIconByGroup = (key: string) => {
  switch (key) {
    case 'sustenance': return markRaw(SustenanceIcon);
    case 'fitness': return markRaw(FitnessIcon);
    case 'recreation': return markRaw(EntertainmentIcon);
    case 'rest': return markRaw(RestIcon);
    case 'paranormal': return markRaw(ParanormalIcon);
    default: return null;
  }
};

const handleResearchProgressed = (event: { researchKey: string; progress: number }) => {
  updateResearchProgress();
};

const handleResearchCompleted = (event: { researchKey: string }) => {
  updateResearchProgress();
};

onMounted(() => {
  emitter.on('researchProgressed', handleResearchProgressed);
  emitter.on('researchCompleted', handleResearchCompleted);
  updateResearchProgress();
});

onBeforeUnmount(() => {
  emitter.off('researchProgressed', handleResearchProgressed);
  emitter.off('researchCompleted', handleResearchCompleted);
});
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

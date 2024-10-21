<template>
  <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
    <n-icon size="24" class="sidebar-icon">
      <component :is="r.icon" />
    </n-icon>
    <span style="padding-left: 10px;" v-if="!collapsed">
      {{ r.label }}
    </span>
    <n-space style="margin-left:auto;" v-if="!collapsed">
      <n-progress 
        type="circle" 
        style="width: 30px;" 
        :percentage="r.progress" 
        :color="r.color"
      >
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

interface Research {
  visible: boolean;
  known: boolean;
  complete: boolean;
  startTime?: number;
  duration?: number;
}

interface ResearchGroup {
  [key: string]: Research;
}

interface Research2 {
  sustenance: ResearchGroup;
  fitness: ResearchGroup;
  recreation: ResearchGroup;
  rest: ResearchGroup;
  paranormal: ResearchGroup;
}

interface ResearchItem {
  key: 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal';
  label: string;
  icon: any;
  level: number;
  progress: number;
  color: string; 
}

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const gameStore = useStore() as { research2: Research2 };

const research = ref<ResearchItem[]>([]);

const updateResearchProgress = () => {
  const researchGroups = gameStore.research2;
  
  research.value = Object.keys(researchGroups).map(groupKey => {
    const group = researchGroups[groupKey as keyof typeof researchGroups];

    const activeResearchKey = Object.keys(group).find(
      key => group[key as keyof typeof group]?.startTime && group[key as keyof typeof group]?.duration
    );

    let progress = 0;
    if (activeResearchKey) {
      const activeResearch = group[activeResearchKey as keyof typeof group] as Research;
      const currentTime = Date.now();
      const elapsedTime = currentTime - activeResearch.startTime!;
      progress = (elapsedTime / activeResearch.duration!) * 100;
    }

    const color = getColorByGroup(groupKey);

    return {
      key: groupKey as 'sustenance' | 'fitness' | 'recreation' | 'rest' | 'paranormal',
      label: groupKey.charAt(0).toUpperCase() + groupKey.slice(1),
      icon: getIconByGroup(groupKey),
      level: Object.values(group).filter(research => research.complete).length,
      progress: Math.min(progress, 100),
      color,
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

const getColorByGroup = (key: string) => {
  switch (key) {
    case 'sustenance': return '#805e7c';
    case 'fitness': return '#826c62';
    case 'recreation': return '#678264';
    case 'rest': return '#5a648c';
    case 'paranormal': return '#625e80';
    default: return '#fff';
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

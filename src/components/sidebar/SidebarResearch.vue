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
import { Research, ResearchDisplay, ResearchItemKeys, ResearchKeys } from '../../utilities/types';
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

const gameStore = useStore() as { research: Research };

const research = ref<ResearchDisplay[]>([]);

const updateResearchProgress = () => {
  const researchGroups = gameStore.research;

  research.value = Object.keys(researchGroups).map(groupKey => {
    const typedGroupKey = groupKey as ResearchKeys;
    const group = researchGroups[typedGroupKey];

    const activeResearchKey = Object.keys(group).find(
      key => {
        const typedKey = key as ResearchItemKeys;
        return group[typedKey]?.startTime && group[typedKey]?.duration;
      }
    );

    let progress = 0;
    if (activeResearchKey) {
      const activeResearch = group[activeResearchKey as ResearchItemKeys];
      const currentTime = Date.now();
      const elapsedTime = currentTime - activeResearch.startTime!;
      progress = (elapsedTime / activeResearch.duration!) * 100;
    }

    const color = getColorByGroup(typedGroupKey);

    return {
      key: typedGroupKey,
      label: typedGroupKey.charAt(0).toUpperCase() + typedGroupKey.slice(1),
      icon: getIconByGroup(typedGroupKey),
      level: Object.values(group).filter(research => research.complete).length,
      progress: Math.min(progress, 100),
      color,
    };
  });
};

const getIconByGroup = (key: ResearchKeys) => {
  switch (key) {
    case 'sustenance': return markRaw(SustenanceIcon);
    case 'fitness': return markRaw(FitnessIcon);
    case 'recreation': return markRaw(EntertainmentIcon);
    case 'rest': return markRaw(RestIcon);
    case 'paranormal': return markRaw(ParanormalIcon);
    default: return null;
  }
};

const getColorByGroup = (key: ResearchKeys) => {
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

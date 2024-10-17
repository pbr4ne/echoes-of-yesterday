<template>
  <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
      <n-icon size="24" class="sidebar-icon">
        <component :is="r.icon" />
      </n-icon>
      <span style="padding-left: 10px;" v-if="!collapsed">
        {{ r.label }}
      </span>
      <n-space style="margin-left:auto;"  v-if="!collapsed">
        <n-progress type="circle" style="width: 30px;" :percentage="r.progress">
          <span class="research-level">{{ r.level +1 }}</span>
        </n-progress>
      </n-space>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';
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

const getHighestLevel = (prefix: string) => {
  let highestLevel = 0;

  for (let i = 1; i <= 10; i++) {
    const key = `${prefix}${i}`;
    const levelData = gameStore.research[key as keyof typeof gameStore.research];
    if (levelData && levelData.complete) {
      highestLevel = i;
    }
  }

  return highestLevel;
};

const progressAmounts = ref<{ [researchKey: string]: number }>({});

const handleResearchProgressed = (event: { researchKey: string; progress: number }) => {
  const key = event.researchKey.slice(0, -1);
  setTimeout(() => {
    progressAmounts.value[key] = event.progress;
  }, 5000);
};

const handleResearchCompleted = (event: {researchKey: string} ) => {
  const key = event.researchKey.slice(0, -1);
  setTimeout(() => {
    progressAmounts.value[key] = 0;
  }, 5000);
};

const research = computed(() => [
  { key: 'sustenance',  label: 'Sustenance',  icon: SustenanceIcon,     level: getHighestLevel('sustenance'), 
    progress: progressAmounts.value['sustenance'] || 0,
  },
  { key: 'fitness',     label: 'Fitness',     icon: FitnessIcon,        level: getHighestLevel('fitness'), 
    progress: progressAmounts.value['fitness'] || 0,
  },
  { key: 'recreation',  label: 'Recreation',  icon: EntertainmentIcon,  level: getHighestLevel('recreation'),
    progress: progressAmounts.value['recreation'] || 0,
   },
  { key: 'rest',        label: 'Rest',        icon: RestIcon,           level: getHighestLevel('rest'),
    progress: progressAmounts.value['rest'] || 0,
   },
  { key: 'paranormal',  label: 'Paranormal',  icon: ParanormalIcon,     level: getHighestLevel('paranormal'),
    progress: progressAmounts.value['paranormal'] || 0,
   },
]);

onMounted(() => {
  emitter.on('researchProgressed', handleResearchProgressed);
  emitter.on('researchCompleted', handleResearchCompleted);
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

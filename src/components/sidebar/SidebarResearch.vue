<template>
  <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
      <n-icon size="24" class="sidebar-icon">
        <component :is="r.icon" />
      </n-icon>
      <span style="padding-left: 10px;" v-if="!collapsed">
        {{ r.label }}
      </span>
      <n-space style="margin-left:auto;"  v-if="!collapsed">
        <n-button circle size="small" class="research-level">
          {{ r.progress }}
        </n-button>
        <n-button circle size="small" class="research-progress">
          &nbsp;
        </n-button>
      </n-space>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { 
  BookTheta24Regular as SustenanceIcon,
  BookPulse24Regular as FitnessIcon,
  BookLetter24Regular as EntertainmentIcon,
  BookStar24Regular as RestIcon,
  BookQuestionMarkRtl24Regular as ParanormalIcon,
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

const research = computed(() => [
  { label: 'Sustenance', key: 'sustenance', icon: SustenanceIcon, progress: getHighestLevel('sustenance') },
  { label: 'Fitness', key: 'fitness', icon: FitnessIcon, progress: getHighestLevel('fitness') },
  { label: 'Recreation', key: 'recreation', icon: EntertainmentIcon, progress: getHighestLevel('recreation') },
  { label: 'Rest', key: 'rest', icon: RestIcon, progress: getHighestLevel('rest') },
  { label: 'Paranormal', key: 'paranormal', icon: ParanormalIcon, progress: getHighestLevel('paranormal') },
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

.research-progress {
  font-size: 12px;
}
</style>

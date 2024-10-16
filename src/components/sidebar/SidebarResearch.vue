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
          {{  r.progress }}
        </n-button>
        <n-button circle size="small">

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

const research = computed(() => [
  { label: 'Sustenance', key: 'sustenance', icon: SustenanceIcon, progress: 1 },
  { label: 'Fitness', key: 'fitness', icon: FitnessIcon, progress: 3 },
  { label: 'Recreation', key: 'recreation', icon: EntertainmentIcon, progress: 8 },
  { label: 'Rest', key: 'rest', icon: RestIcon, progress: 2 },
  { label: 'Paranormal', key: 'paranormal', icon: ParanormalIcon, progress: 10 },
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

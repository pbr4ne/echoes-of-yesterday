<template>
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../composables/useStore';
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

const ghosts = computed(() => [
  { label: 'Poltergeist', key: 'poltergeist', icon: PoltergeistIcon, status: 'Encountered' },
  { label: 'Orb', key: 'orb', icon: OrbIcon, status: 'Encountered' },
  { label: 'Wraith', key: 'wraith', icon: WraithIcon, status: 'Encountered' },
  { label: 'Spirit', key: 'spirit', icon: SpiritIcon, status: 'Communicated' },
  { label: '???', key: 'apparition', icon: ApparitionIcon, status: 'Encountered' },
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

.ghost-label {
  flex-grow: 1;
}

.n-tag {
  margin-left: auto;
}
</style>

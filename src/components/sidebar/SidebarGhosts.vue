<template>
  <div v-for="(ghost, key) in ghosts" :key="key" class="sidebar-item">
    <n-icon size="24" class="sidebar-icon" :class="{ pulsate: ghost.isActive }">
      <component :is="ghost.icon" />
    </n-icon>
    <span class="ghost-label" style="padding-left: 10px;" :class="{ pulsate: ghost.isActive }" v-if="!collapsed">
      {{ ghost.label }}
    </span>
    <n-tag :color="ghost.tagColor" size="small" round :class="{ pulsate: ghost.isActive }" v-if="!collapsed">
      {{ ghost.status }}
    </n-tag>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { ChartBubble as OrbIcon, Atom2 as SpiritIcon } from '@vicons/tabler';
import { WindySnow as WraithIcon, Calibrate as PoltergeistIcon } from '@vicons/carbon';
import { AutoAwesomeOutlined as ApparitionIcon } from '@vicons/material';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const ghostIcons = {
  poltergeist: PoltergeistIcon,
  orb: OrbIcon,
  wraith: WraithIcon,
  spirit: SpiritIcon,
  phantom: ApparitionIcon,
};

const gameStore = useStore();

const getTagColor = (state: string) => {
  switch (state) {
    case 'Unknown':
      return { borderColor: '#8b8763', textColor: '#8b8763' };
    case 'Encountered':
      return { borderColor: '#8b8763', textColor: '#8b8763' };
    case 'Identified':
      return { borderColor: '#8a9574', textColor: '#8a9574' };
    case 'Communicated':
      return { borderColor: '#99b182', textColor: '#99b182' };
    case 'Befriended':
      return { borderColor: '#d7dd99', textColor: '#b7bd83' };
    case 'Banished':
      return { borderColor: '#d7dd99', textColor: '#d7dd99' };
    default:
      return { borderColor: '#8b8763', textColor: '#8b8763' };
  }
};

const ghosts = computed(() => {
  return Object.entries(gameStore.ghosts)
    .filter(([_, ghost]) => ghost.state !== 'Unknown')
    .map(([key, ghost]) => {
      let label;

      if (ghost.state === 'Encountered') {
        label = '???';
      } 
      else if (ghost.state === 'Befriended' || ghost.state === 'Banished') {
        label = ghost.name;
      } 
      else {
        label = key.charAt(0).toUpperCase() + key.slice(1);
      }

      return {
        label,
        key,
        icon: ghostIcons[key as keyof typeof ghostIcons],
        status: ghost.state,
        isActive: ghost.isActive,
        tagColor: getTagColor(ghost.state),
      };
    });
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

.ghost-label {
  flex-grow: 1;
}

.n-tag {
  margin-left: auto;
}

.pulsate {
  animation: pulsate 1.5s infinite;
}

@keyframes pulsate {
  0% {
    filter: brightness(1);
    opacity: 1;
  }
  50% {
    filter: brightness(1.5);
    opacity: 0.2;
  }
  100% {
    filter: brightness(1);
    opacity: 1;
  }
}

</style>

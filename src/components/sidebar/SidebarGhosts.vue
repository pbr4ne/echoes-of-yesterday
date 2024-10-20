<template>
  <div v-for="(ghost, key) in ghosts" :key="key" class="sidebar-item">
    <n-icon size="24" class="sidebar-icon" :class="{ pulsate: ghost.active.isActive }">
      <component :is="ghost.icon" />
    </n-icon>
    <span class="ghost-label" style="padding-left: 10px;" :class="{ pulsate: ghost.active.isActive }" v-if="!collapsed">
      {{ getLabel(ghost) }}
    </span>
    <n-tag :color="getTagColor(ghost.state)" size="small" round :class="{ pulsate: ghost.active.isActive }" v-if="!collapsed">
      {{ ghost.state }}
    </n-tag>
  </div>
</template>

<script setup lang="ts">
import { useGhostsDisplay } from '../../composables/useGhostsDisplay';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const { ghosts } = useGhostsDisplay();

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

const getLabel = (ghost: any) => {
  if (ghost.state === 'Encountered') {
    return '???';
  } 
  else if (ghost.state === 'Befriended' || ghost.state === 'Banished') {
    return ghost.name;
  } 
  else {
    return ghost.key.charAt(0).toUpperCase() + ghost.key.slice(1);
  }
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

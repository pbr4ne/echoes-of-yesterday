<template>
  <div v-for="(ghost, key) in knownGhosts" :key="key" class="sidebar-item">
    <n-tooltip trigger="hover" :disabled="!collapsed">
      <template #trigger>
        <n-icon 
          size="24" 
          class="sidebar-icon" 
          :class="{ pulsate: (ghost.active.isActive && !paused) }"
          :color="collapsed ? getTagColor(ghost.state).textColor : undefined"
        >
          <component :is="ghost.icon" />
        </n-icon>
      </template>
      <span>{{ getLabel(ghost) }}</span>
    </n-tooltip>
    <span class="ghost-label" style="padding-left: 10px;" :class="{ pulsate: ghost.active.isActive && !paused }" v-if="!collapsed">
      {{ getLabel(ghost) }}
    </span>
    <n-tag :color="getTagColor(ghost.state)" size="small" round :class="{ pulsate: ghost.active.isActive && !paused }" v-if="!collapsed">
      {{ ghost.state }}
    </n-tag>
  </div>
</template>

<script setup lang="ts">
import { useGhosts } from '../../composables/useGhosts';
import { useTime } from '../../composables/useTime';

const { paused } = useTime();

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const { knownGhosts, getLabel, getTagColor } = useGhosts();
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

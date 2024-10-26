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
import { useGhosts } from '../../composables/useGhosts';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const { ghosts, getLabel, getTagColor } = useGhosts();
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

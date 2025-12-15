<template>
  <div v-for="(item, index) in stats" :key="item.key" class="sidebar-item">
    <n-tooltip trigger="hover" :disabled="!collapsed">
      <template #trigger>
        <n-icon 
          size="24" 
          class="sidebar-icon" 
          :color="collapsed ? getProgressColor(item.percentage) : undefined"
        >
          <component :is="item.icon" />
        </n-icon>
        </template>
      <span>{{ item.label }}</span>
    </n-tooltip>
    <div class="progress-wrapper" v-if="!collapsed">
      <n-progress
        :percentage="item.percentage"
        type="line"
        :height="20"
        :color="getProgressColor(item.percentage)"
        :show-indicator="false"
      />
      <div class="progress-label">
        <span class="progress-text" :style="{ color: getTextColor() }">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStats } from '../../composables/useStats';

const { stats, getProgressColor, getTextColor } = useStats();

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
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

.progress-wrapper {
  position: relative;
  flex-grow: 1;
  margin-left: 8px;
  width: 100%;
}

.progress-label {
  position: absolute;
  top: 0;
  left: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.n-progress {
  width: 100%;
}
</style>

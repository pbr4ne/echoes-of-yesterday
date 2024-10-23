<template>
  <n-layout has-sider>
    <n-layout-sider>
      <n-card title="You">
        <template #cover>
          <img :src="profileSvg" alt="Profile">
        </template>
      </n-card>
    </n-layout-sider>
    <n-layout-content>
      <div v-for="(item, index) in stats" :key="item.key" class="stats-item">
        <n-icon size="24" class="stats-icon">
          <component :is="item.icon" />
        </n-icon>
        <div class="progress-wrapper">
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
    </n-layout-content>
  </n-layout> 
</template>

<script setup lang="ts">
import { useStats } from '../../composables/useStats';
import profileSvg from '@/assets/profile.svg';

const { stats, getProgressColor, getTextColor } = useStats();
</script>

<style scoped>
.stats-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.stats-icon {
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

.n-card {
  max-width: 200px;
}
</style>
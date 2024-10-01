<template>
  <n-space vertical size="medium" style="padding: 20px;">
    <div v-for="(item, index) in sidebar" :key="item.key" class="sidebar-item">
      <n-icon size="24" class="sidebar-icon">
        <component :is="item.icon" />
      </n-icon>
      <div class="progress-wrapper">
        <n-progress
          v-if="!collapsed"
          :percentage="item.percentage"
          type="line"
          :height="20"
          color="#1e4378"
          :show-indicator="false"
        />
        <div class="progress-label">
          <span class="progress-text">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NIcon } from 'naive-ui';

// Import icons
import { FoodToast24Regular as HungerIcon } from '@vicons/fluent';
import { Coffee as ThirstIcon, DeviceTv as BoredomIcon } from '@vicons/tabler';
import { Sleep24Regular as FatigueIcon } from '@vicons/fluent';
import { ExclamationCircleOutlined as FearIcon } from '@vicons/antd';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const sidebar = computed(() => [
  { label: 'Hunger', key: 'hunger', icon: HungerIcon, percentage: 40 },
  { label: 'Thirst', key: 'thirst', icon: ThirstIcon, percentage: 60 },
  { label: 'Boredom', key: 'boredom', icon: BoredomIcon, percentage: 80 },
  { label: 'Fatigue', key: 'fatigue', icon: FatigueIcon, percentage: 50 },
  { label: 'Fear', key: 'fear', icon: FearIcon, percentage: 4 }
]);
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  width: 100%;
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

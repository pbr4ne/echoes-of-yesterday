<template>
  <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
      <n-icon size="24" class="sidebar-icon">
        <component :is="r.icon" />
      </n-icon>
      <span class="ghost-label" style="padding-left: 10px;" v-if="!collapsed">
        {{ r.label }}
      </span>
      <n-tag :bordered="false" type="info">
        {{ r.progress }}/10
      </n-tag>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { ExclamationCircleOutlined as FearIcon } from '@vicons/antd';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const gameStore = useStore();

const research = computed(() => [
  { label: 'Cooking', key: 'cooking', icon: FearIcon, progress: 1 },
  { label: 'Teamaking', key: 'teamaking', icon: FearIcon, progress: 3 },
  { label: 'Conjuration', key: 'conjuration', icon: FearIcon, progress: 8 },
  { label: 'Illusionary Visions', key: 'illusionaryVisions', icon: FearIcon, progress: 2 },
  { label: 'Meditation', key: 'meditation', icon: FearIcon, progress: 10 },
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

.n-tag {
  margin-left: auto;
}
</style>

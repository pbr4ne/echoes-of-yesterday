<template>
  <n-space vertical size="medium" style="padding: 20px;">
    <sidebar-stats :collapsed="collapsed" />
    <n-divider dashed :style="dividerStyle" />
    <sidebar-ghosts :collapsed="collapsed" />
    <n-divider dashed :style="dividerStyle" />
    <sidebar-research :collapsed="collapsed" />
  </n-space>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import SidebarStats from '../sidebar/SidebarStats.vue';
import SidebarGhosts from '../sidebar/SidebarGhosts.vue';
import SidebarResearch from '../sidebar/SidebarResearch.vue';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const screenHeight = ref(window.innerHeight);

const dividerStyle = computed(() => {
  return screenHeight.value < 780 ? { margin: '0' } : {};
});

const updateScreenHeight = () => {
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenHeight);
});
</script>
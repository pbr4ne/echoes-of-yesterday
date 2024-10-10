<template>
  <n-space vertical size="medium" style="padding: 20px;">
    <sidebar-stats :collapsed="collapsed" />
    <n-divider />
    <sidebar-ghosts :collapsed="collapsed" />
    <n-divider />
    <sidebar-research :collapsed="collapsed" />
  </n-space>
</template>

<script setup lang="ts">
import SidebarStats from './sidebar/SidebarStats.vue';
import SidebarGhosts from './sidebar/SidebarGhosts.vue';
import SidebarResearch from './sidebar/SidebarResearch.vue';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});
</script>

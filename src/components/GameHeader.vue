<template>
  <n-space justify="space-between">
    <n-space v-if="showTitle" style="padding-left: 5px;" width="100%" class="eoyHeader">
      <span>Echoes of Yesterday</span>
    </n-space>
    <n-space style="padding-top: 10px; padding-bottom: 8px; padding-left: 10px;">
      <n-button dashed circle size="large">
        <template #icon>
          <component :is="renderIcon(RoomsIcon)" />
        </template>
      </n-button>
      <n-button dashed circle size="large">
        <template #icon>
          <component :is="renderIcon(ProfileIcon)" />
        </template>
      </n-button>
      <n-button dashed circle size="large">
        <template #icon>
          <component :is="renderIcon(ResearchIcon)" />
        </template>
      </n-button>
      <span class="timeHeader" v-if="showTitle">
        Day {{ store.calendar.days }} 
        {{ String(store.calendar.hours).padStart(2, '0') }}:{{ String(Math.floor(store.calendar.minutes / 10) * 10).padStart(2, '0') }}
      </span>
      <component class="eoyHeader" :is="renderIcon(SunIcon, '#f7de5e')" />
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useStore } from '../composables/useStore'
  import { Door as RoomsIcon } from '@vicons/tabler';
  import { UserSearch as ProfileIcon } from '@vicons/tabler';
  import { AccountTreeOutlined as ResearchIcon } from '@vicons/material';
  import { SunnyOutline as SunIcon } from '@vicons/ionicons5';
  import { renderIcon } from '../composables/useIcon';

  const showTitle = ref(window.innerWidth > 730);
  const store = useStore();

  const updateTitle = () => {
    showTitle.value = window.innerWidth > 730;
  };

  onMounted(() => {
    window.addEventListener('resize', updateTitle);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTitle);
  });
</script>
  
<style scoped>
  .eoyHeader {
    font-family: 'Fondamento', sans-serif;
    font-size: 40px;
    padding-right: 5px;
    padding-left: 5px;
  }

  .timeHeader {
    font-family: 'Kode Mono', sans-serif;
    font-size: 20px;
    padding-right: 5px;
    padding-left: 5px;
    position: relative;
    top: 3px;
  }
</style>

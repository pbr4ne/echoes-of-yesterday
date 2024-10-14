<template>
  <n-space justify="space-between">
    <n-space style="padding-left: 5px;" width="100%" class="eoyHeader">
      <span>{{ titleValue }}</span>
    </n-space>
    <n-space class="time-container" style="padding-top: 10px;">
      <span class="timeHeader" style="padding-top: 35px;">
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
  import { SunnyOutline as SunIcon } from '@vicons/ionicons5';
  import { renderIcon } from '../composables/useIcon';

  const titleValue = ref(getTitleValue());
  const store = useStore();

  function getTitleValue() {
    return window.innerWidth >= 450 ? 'Echoes of Yesterday' : 'EoY';
  }

  const updateTitle = () => {
    titleValue.value = getTitleValue();
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
  }
</style>

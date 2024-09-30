<template>
  <n-space justify="space-between" class="eoyHeader">
    <n-space style="padding-left: 5px;" width="100%">
      <span>{{ titleValue }}</span>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const titleValue = ref(getTitleValue());

function getTitleValue() {
  return window.innerWidth > 500 ? 'Echoes of Yesterday' : 'EoY';
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
  @import url('https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&display=swap');
  
  .eoyHeader {
    font-family: 'Fondamento', sans-serif;
    font-size: 40px;
    padding-right: 5px;
    padding-left: 5px;
  }
</style>

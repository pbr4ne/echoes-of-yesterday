<template>
  <n-space justify="space-between" class="eoyHeader">
    <n-space style="padding-left: 5px;" width="100%">
      <span>{{ titleValue }}</span>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const titleValue = window.innerWidth > 700 ? ref('Echoes of Yesterday') : ref('EoY');
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

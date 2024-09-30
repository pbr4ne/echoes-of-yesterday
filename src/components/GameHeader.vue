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
  .eoyHeader {
    padding-right: 5px;
    padding-left: 5px;
  }
</style>

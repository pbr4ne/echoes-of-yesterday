<template>
  <n-config-provider :theme="darkTheme">
    <div :style="{ backgroundColor: backgroundColor, height: '100vh' }">
      <n-button type="primary">Boo</n-button>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui';
import { computed } from 'vue';

const backgroundColor = computed(() => {
  return darkTheme.common?.bodyColor;
});
</script>
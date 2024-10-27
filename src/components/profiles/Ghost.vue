<template>
  <n-card>{{ ghost.type }}</n-card>
</template>
<script setup lang="ts">
const { ghost } = defineProps({
  ghost: {
    type: Object,
    required: true,
  },
});
</script>
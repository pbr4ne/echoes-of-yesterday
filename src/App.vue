<template>
  <n-config-provider :theme="theme">
    <game />
    <cursor-trail v-if="showCursorTrail" />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Game from './components/Game.vue';
import CursorTrail from './components/spooky/CursorTrail.vue';
import useTheme from './composables/useTheme';
import { useSpookyEffects } from './composables/useSpookyEffects';
import { darkTheme } from 'naive-ui';

const showCursorTrail = ref(false);

const toggleCursorTrail = (state: boolean) => {
  showCursorTrail.value = state;
};

const { lightMode } = useTheme();
const theme = computed(() => {
  return lightMode.value ? null : darkTheme;
});

useSpookyEffects(toggleCursorTrail);
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

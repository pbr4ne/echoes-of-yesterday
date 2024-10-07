<template>
  <n-config-provider :theme="theme">
    <game />
    <cursor-trail />
    <clickable-orb />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import gsap from 'gsap';
import Game from './components/Game.vue';
import CursorTrail from './components/spooky/CursorTrail.vue';
import ClickableOrb from './components/spooky/ClickableOrb.vue';
import useTheme from './composables/useTheme';
import { useSpookyEffects } from './composables/useSpookyEffects';
import { darkTheme } from 'naive-ui';

const { lightMode } = useTheme();

const theme = computed(() => {
  return lightMode.value ? null : darkTheme;
});

useSpookyEffects();
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

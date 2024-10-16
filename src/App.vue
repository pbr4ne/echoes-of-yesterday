<template>
  <n-config-provider :theme="theme">
    <game />
    <cold-trail v-if="showColdTrail" />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Game from './components/Game.vue';
import ColdTrail from './components/spooky/ColdTrail.vue';
import useTheme from './composables/useTheme';
import { useSpookyEffects } from './composables/useSpookyEffects';
import { darkTheme } from 'naive-ui';

const showColdTrail = ref(false);

const toggleColdTrail = (state: boolean) => {
  showColdTrail.value = state;
};

const { lightMode } = useTheme();
const theme = computed(() => {
  return lightMode.value ? null : darkTheme;
});

useSpookyEffects(toggleColdTrail);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zeyada&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&family=Zeyada&display=swap"');
@import url('https://fonts.googleapis.com/css2?family=Redacted+Script:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

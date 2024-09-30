<template>
  <n-config-provider :theme="theme()">
    <game />
  </n-config-provider>
</template>

<script>
import Game from './components/Game.vue'
import useTheme from './composables/useTheme'
import { darkTheme } from 'naive-ui';

export default {
  name: 'App',
  components: {
    Game,
  },
  setup () {
    const { lightMode } = useTheme(); 

    return {
      theme: () => {
        if(lightMode.value){
          return null;
        } else {
          return darkTheme;
        }
      },
    };
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

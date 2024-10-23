<template>
  <n-layout 
    position="absolute" 
    :native-scrollbar="false"
    content-style="height: 100%; display: flex; flex-direction: column"
  >
    <n-layout-header bordered style="padding-top: 5px">
      <game-header />
    </n-layout-header>

    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :collapsed="leftCollapsed"
        :width="245"
        :native-scrollbar="false"
        @collapse="() => handleCollapse('left')"
        @expand="() => handleExpand('left')"
      >
        <game-sidebar :collapsed="leftCollapsed" />
      </n-layout-sider>

      <n-layout has-sider sider-placement="right">
        <n-layout-content>
          <component :is="currentView" />
        </n-layout-content>

        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="15"
          :collapsed="rightCollapsed"
          :width="245"
          :native-scrollbar="false"
          @collapse="() => handleCollapse('right')"
          @expand="() => handleExpand('right')"
        >
          <game-log :collapsed="rightCollapsed"/>
        </n-layout-sider>
      </n-layout>
    </n-layout>

    <n-layout-footer bordered style="flex-shrink: 0">
      <game-footer />
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
  import { ref, watchEffect, onBeforeUnmount, onMounted, shallowRef } from 'vue';
  import { emitter } from '../../utilities/emitter';  
  import { View } from '../../utilities/types';
  import GameFooter from './GameFooter.vue';
  import GameHeader from './GameHeader.vue';
  import GameLog from './GameLog.vue';
  import GameSidebar from './GameSidebar.vue';
  import Rooms from '../areas/Rooms.vue';
  import Research from '../areas/Research.vue';
  import Profile from '../areas/Profile.vue';

  const leftCollapsed = ref(isSmallWindow());
  const rightCollapsed = ref(isSmallWindow());
  const isSmallScreen = ref(isSmallWindow());

  const currentView = shallowRef(Profile);

  const switchView = (event: { view: View }) => {
    if (event.view === 'Rooms') {
      currentView.value = Rooms;
    } else if (event.view === 'Research') {
      currentView.value = Research;
    } else if (event.view === 'Profile') {
      currentView.value = Profile;
    } else {
      console.warn('Unknown view:', event.view);
    }
  };

  const handleExpand = (side: 'left' | 'right') => {
    if (side === 'left') {
      leftCollapsed.value = false;
      if (isSmallScreen.value) rightCollapsed.value = true;
    } else {
      rightCollapsed.value = false;
      if (isSmallScreen.value) leftCollapsed.value = true;
    }
  };

  const handleCollapse = (side: 'left' | 'right') => {
    if (side === 'left') {
      leftCollapsed.value = true;
    }
    else {
      rightCollapsed.value = true;
    }
  };

  const updateScreenSize = () => {
    const wasSmallScreen = isSmallScreen.value;
    isSmallScreen.value = window.innerWidth < 730;
    
    if (isSmallScreen.value && !wasSmallScreen) {
      rightCollapsed.value = true;
    }
  };

  function isSmallWindow() {
    return window.innerWidth < 730;
  }

  window.addEventListener('resize', updateScreenSize);

  onMounted(() => {
    emitter.on('switchView', switchView);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize);
    emitter.off('switchView', switchView);
  });

  watchEffect(() => {
    updateScreenSize();
  });
</script>

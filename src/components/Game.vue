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
        @collapse="leftCollapsed = true"
        @expand="leftCollapsed = false"
      >
        sider (left)
      </n-layout-sider>

      <n-layout has-sider sider-placement="right">
        <n-layout-content>
          tabs
        </n-layout-content>

        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :collapsed="rightCollapsed"
          :width="245"
          :native-scrollbar="false"
          @collapse="rightCollapsed = true"
          @expand="rightCollapsed = false"
        >
          sider (right)
        </n-layout-sider>
      </n-layout>
    </n-layout>

    <n-layout-footer bordered style="flex-shrink: 0">
      footer
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import GameHeader from './GameHeader.vue'

  const leftCollapsed = ref(false);
  const rightCollapsed = ref(false);
</script>
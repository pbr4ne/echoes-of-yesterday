<template>
  <n-layout 
    position="absolute" 
    :native-scrollbar="false"
    content-style="height: 100%; display: flex; flex-direction: column"
  >
    <n-layout-header bordered style="padding-top: 5px">
      header
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :collapsed="collapsed"
        :width="245"
        :native-scrollbar="false"
        @collapse="collapsed = true"
        @expand="collapsed = false" 
      >
        sider
      </n-layout-sider>
      <n-layout-content>
        tabs
      </n-layout-content>
    </n-layout>
    <n-layout-footer bordered style="flex-shrink: 0">
      footer
    </n-layout-footer>
  </n-layout>
</template>
  
<script setup lang="ts">
</script>
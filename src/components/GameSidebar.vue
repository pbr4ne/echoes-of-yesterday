<template>
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="24"
      :icon-size="24"
      :options="sidebar"
    />
  </template>
  
  <script setup lang="ts">
    import type { Component } from 'vue'
    import { computed, defineProps, h } from 'vue'
    import { NIcon } from 'naive-ui'
    import type { MenuOption } from 'naive-ui'
    import { FoodToast24Regular as HungerIcon } from '@vicons/fluent'
    import { Coffee as ThirstIcon } from '@vicons/tabler'
    import { DeviceTv as BoredomIcon } from '@vicons/tabler'
    import { Sleep24Regular as FatigueIcon } from '@vicons/fluent'
    import { ExclamationCircleOutlined as FearIcon } from '@vicons/antd'
    
    function renderIcon(icon: Component) {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    const props = defineProps({
        collapsed: {
            type: Boolean,
            required: true,
        },
    });

    const sidebar = computed(() => {
        const sidebarData: MenuOption[] = [
        {
            label: "Hunger",
            key: 'hunger',
            icon: renderIcon(HungerIcon)
        },
        {
            label: 'Thirst',
            key: 'thirst',
            icon: renderIcon(ThirstIcon)
        },
        {
            label: 'Boredom',
            key: 'boredom',
            icon: renderIcon(BoredomIcon)
        },
        {
            label: 'Fatigue',
            key: 'fatigue',
            icon: renderIcon(FatigueIcon)
        },
        {
            label: 'Fear',
            key: 'fear',
            icon: renderIcon(FearIcon)
        }]
        
        return sidebarData;
    });
</script>
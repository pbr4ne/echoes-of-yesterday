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
  import { computed } from 'vue';
  import type { MenuOption } from 'naive-ui';
  import { renderIcon } from '../composables/useIcon';
  
  import { FoodToast24Regular as HungerIcon } from '@vicons/fluent';
  import { Coffee as ThirstIcon, DeviceTv as BoredomIcon } from '@vicons/tabler';
  import { Sleep24Regular as FatigueIcon } from '@vicons/fluent';
  import { ExclamationCircleOutlined as FearIcon } from '@vicons/antd';

  const { collapsed } = defineProps({
    collapsed: {
      type: Boolean,
      required: true,
    },
  });

  const sidebar = computed<MenuOption[]>(() => [
    { label: 'Hunger', key: 'hunger', icon: renderIcon(HungerIcon) },
    { label: 'Thirst', key: 'thirst', icon: renderIcon(ThirstIcon) },
    { label: 'Boredom', key: 'boredom', icon: renderIcon(BoredomIcon) },
    { label: 'Fatigue', key: 'fatigue', icon: renderIcon(FatigueIcon) },
    { label: 'Fear', key: 'fear', icon: renderIcon(FearIcon) }
  ]);
</script>

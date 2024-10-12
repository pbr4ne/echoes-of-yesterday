<template>
  <n-tabs
    v-model:value="name"
    type="card"
    size="small"
    tab-style="padding: 7px"
  >
    <n-tab-pane
      v-for="(panel, index) in panels"
      :key="panel.name"
      :name="panel.name"
      style="padding: 20px;"
    >
      <template #tab>
        <n-icon :class="{ 'pulsate': isRoomActive(panel.name) }" class="tab-icon">
          <component :is="icons[index]" />
        </n-icon>
        <span v-if="showText" :class="{ 'pulsate': isRoomActive(panel.name) }" class="tab-text">
          {{ panel.label }}
        </span>
      </template>

      <component :is="panel.component" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent, shallowRef } from 'vue';
import { useStore } from '../composables/useStore';
import { NIcon } from 'naive-ui';

const LivingRoom = defineAsyncComponent(() => import('./rooms/LivingRoom.vue'));
const Kitchen = defineAsyncComponent(() => import('./rooms/Kitchen.vue'));
const Bedroom = defineAsyncComponent(() => import('./rooms/Bedroom.vue'));
const Sunroom = defineAsyncComponent(() => import('./rooms/Sunroom.vue'));
const Bathroom = defineAsyncComponent(() => import('./rooms/Bathroom.vue'));
const Den = defineAsyncComponent(() => import('./rooms/Den.vue'));
const Cellar = defineAsyncComponent(() => import('./rooms/Cellar.vue'));

import LivingRoomIcon from '@vicons/tabler/Lamp';
import KitchenIcon from '@vicons/material/KitchenOutlined';
import BedroomIcon from '@vicons/ionicons5/BedOutline';
import SunroomIcon from '@vicons/tabler/Plant';
import BathroomIcon from '@vicons/material/ShowerOutlined';
import DenIcon from '@vicons/ionicons5/BookOutline';
import CrawlspaceIcon from '@vicons/fluent/ConferenceRoom24Regular';

const name = ref('Kitchen');
const panels = ref([
  { name: 'Living Room', label: 'Living Room', component: shallowRef(LivingRoom) },
  { name: 'Kitchen', label: 'Kitchen', component: shallowRef(Kitchen) },
  { name: 'Bedroom', label: 'Bedroom', component: shallowRef(Bedroom) },
  { name: 'Sunroom', label: 'Sunroom', component: shallowRef(Sunroom) },
  { name: 'Bathroom', label: 'Bathroom', component: shallowRef(Bathroom) },
  { name: 'Den', label: 'Den', component: shallowRef(Den) },
  { name: 'Cellar', label: 'Crawlspace', component: shallowRef(Cellar) }
]);

const icons = [
  LivingRoomIcon,
  KitchenIcon,
  BedroomIcon,
  SunroomIcon,
  BathroomIcon,
  DenIcon,
  CrawlspaceIcon
];

const showText = ref(window.innerWidth > 650);

const updateShowText = () => {
  showText.value = window.innerWidth > 650;
};

onMounted(() => {
  window.addEventListener('resize', updateShowText);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateShowText);
});

const gameStore = useStore();

const isRoomActive = (roomName: string) => {
  return Object.values(gameStore.ghosts).some(ghost => ghost.activeRoom === roomName && ghost.isActive);
};
</script>

<style scoped>
  .tab-icon {
    margin-right: 8px;
    font-size: 20px;
  }

  .tab-text {
    vertical-align: middle;
  }

  .pulsate {
    animation: pulsate 1.5s infinite;
  }

  @keyframes pulsate {
    0% {
      filter: brightness(1);
      opacity: 1;
    }
    50% {
      filter: brightness(1.5);
      opacity: 0.2;
    }
    100% {
      filter: brightness(1);
      opacity: 1;
    }
  }
</style>

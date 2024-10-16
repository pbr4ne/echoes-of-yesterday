<template>
  <n-space justify="space-between">
    <n-space v-if="showTitle" style="padding-left: 5px;" width="100%" class="eoyHeader">
      <span>Echoes of Yesterday</span>
    </n-space>
    <n-space style="padding-top: 10px; padding-bottom: 8px; padding-left: 10px;">
      <n-badge dot processing :value="roomsBadge" :show="roomsBadge > 0" type="warning">
        <n-button
          :class="{ 'active-button': currentView === 'Rooms' }"
          dashed
          circle
          size="large"
          @click="switchView('Rooms')"
        >
          <template #icon>
            <component :is="renderIcon(RoomsIcon)" />
          </template>
        </n-button>
      </n-badge>
      <n-badge dot processing :value="profileBadge" :show="profileBadge > 0" type="warning">
        <n-button
          :class="{ 'active-button': currentView === 'Profile' }"
          dashed
          circle
          size="large"
          @click="switchView('Profile')"
        >
          <template #icon>
            <component :is="renderIcon(ProfileIcon)" />
          </template>
        </n-button>
      </n-badge>
      <n-badge dot processing :value="researchBadge" :show="researchBadge > 0" type="warning">
        <n-button
          :class="{ 'active-button': currentView === 'Research' }"
          dashed
          circle
          size="large"
          @click="switchView('Research')"
        >
          <template #icon>
            <component :is="renderIcon(ResearchIcon)" />
          </template>
        </n-button>
      </n-badge>
      <span class="timeHeader" v-if="showTitle">
        Day {{ store.calendar.days }} 
        {{ String(store.calendar.hours).padStart(2, '0') }}:{{ String(Math.floor(store.calendar.minutes / 10) * 10).padStart(2, '0') }}
      </span>
      <component class="eoyHeader" :is="renderIcon(SunIcon, '#f7de5e')" />
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { View } from '../utilities/types';
  import { useStore } from '../composables/useStore'
  import { emitter } from '../utilities/emitter';
  import { Door as RoomsIcon, UserSearch as ProfileIcon } from '@vicons/tabler';
  import { AccountTreeOutlined as ResearchIcon } from '@vicons/material';
  import { SunnyOutline as SunIcon } from '@vicons/ionicons5';
  import { renderIcon } from '../composables/useIcon';

  const showTitle = ref(window.innerWidth > 730);
  const store = useStore();
  const currentView = ref<View>('Rooms');

  const switchView = (view: View) => {
    currentView.value = view;
    emitter.emit('switchView', { view });
  };

  const updateTitle = () => {
    showTitle.value = window.innerWidth > 730;
  };

  const roomsBadge = ref(0);
  const profileBadge = ref(0);
  const researchBadge = ref(1);

  onMounted(() => {
    window.addEventListener('resize', updateTitle);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTitle);
  });
</script>
  
<style scoped>
  .eoyHeader {
    font-family: 'Fondamento', sans-serif;
    font-size: 40px;
    padding-right: 5px;
    padding-left: 5px;
  }

  .timeHeader {
    font-family: 'Kode Mono', sans-serif;
    font-size: 20px;
    padding-right: 5px;
    padding-left: 5px;
    position: relative;
    top: 3px;
  }

  .active-button,
  .active-button:hover,
  .active-button:active,
  .active-button:focus {
    background-color: #f0f0f0;
    color: #000000;
}
</style>

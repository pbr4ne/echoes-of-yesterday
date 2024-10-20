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
        <n-icon class="tab-icon">
          <component :is="icons[index]" />
        </n-icon>
        <span v-if="showText" class="tab-text">
          {{ panel.label }}
        </span>
      </template>

      <component :is="panel.component" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent, shallowRef } from 'vue';
import { useStore } from '../../composables/useStore';
import { NIcon } from 'naive-ui';

const You = defineAsyncComponent(() => import('../profiles/You.vue'));
const Ghost = defineAsyncComponent(() => import('../profiles/Ghost.vue'));

import ProfileIcon from '@vicons/fluent/PersonCircle24Regular';
import GhostIcon from '@vicons/tabler/ChartBubble';

const name = ref('You');
const panels = ref([
  { name: 'You', label: 'You', component: shallowRef(You) },
  { name: 'Ghost', label: 'Ghost', component: shallowRef(Ghost) },
]);

const icons = [
  ProfileIcon,
  GhostIcon,
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
</script>

<style scoped>
  .tab-icon {
    margin-right: 8px;
    font-size: 20px;
  }

  .tab-text {
    vertical-align: middle;
  }
</style>
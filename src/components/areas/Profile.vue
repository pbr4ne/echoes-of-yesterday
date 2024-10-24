<template>
  <n-tabs
    v-model:value="name"
    type="card"
    size="small"
    tab-style="padding: 7px"
  >
    <n-tab-pane name="You" style="padding: 20px;">
      <template #tab>
        <n-icon class="tab-icon">
          <component :is="ProfileIcon" />
        </n-icon>
        <span v-if="showText" class="tab-text">You</span>
      </template>
      <component :is="You" />
    </n-tab-pane>

    <n-tab-pane
      v-for="(ghost, index) in ghosts"
      :key="ghost.key"
      :name="ghost.key"
      style="padding: 20px;"
    >
      <template #tab>
        <n-icon :class="{ 'pulsate': ghost.active.isActive }" class="tab-icon">
          <component :is="ghost.icon" />
        </n-icon>
        <span v-if="showText" :class="{ 'pulsate': ghost.active.isActive }" class="tab-text">{{ ghost.type }}</span>
      </template>
      <component :is="Ghost" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue';
import { useGhosts } from '../../composables/useGhosts';
import ProfileIcon from '@vicons/fluent/PersonCircle24Regular';

const You = defineAsyncComponent(() => import('../profiles/You.vue'));
const Ghost = defineAsyncComponent(() => import('../profiles/Ghost.vue'));

const name = ref('You');
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

const { ghosts } = useGhosts();
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
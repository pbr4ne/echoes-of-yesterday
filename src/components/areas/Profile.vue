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
      <you />
    </n-tab-pane>

    <n-tab-pane
      v-for="(ghost, index) in knownGhosts"
      :key="ghost.key"
      :name="ghost.key"
      style="padding: 20px;"
    >
      <template #tab>
        <n-icon :class="{ 'pulsate': ghost.active.isActive }" class="tab-icon">
          <component :is="ghost.icon" />
        </n-icon>
        <span v-if="showText" :class="{ 'pulsate': ghost.active.isActive }" class="tab-text">{{ getLabel(ghost) }}</span>
      </template>
      <ghost :ghost="ghost" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGhosts } from '../../composables/useGhosts';
import ProfileIcon from '@vicons/fluent/PersonCircle24Regular';
import ghost from '../profiles/Ghost.vue';
import you from '../profiles/You.vue';

const name = ref('poltergeist');
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

const { knownGhosts, getLabel } = useGhosts();
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
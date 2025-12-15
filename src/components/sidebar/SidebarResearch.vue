<template>
  <div v-for="(r, index) in research" :key="r.key" class="sidebar-item">
    <n-tooltip trigger="hover" :disabled="!collapsed">
      <template #trigger>
        <n-icon 
          size="24" 
          class="sidebar-icon"
          :color="collapsed && researchProgresses[r.key] > 0 ? r.colorLight : undefined"
        >
          <component :is="r.icon" />
        </n-icon>
      </template>
      <span>{{ r.title }}</span>
    </n-tooltip>
    <span style="padding-left: 10px;" v-if="!collapsed">
      {{ r.title }}
    </span>
    <n-space style="margin-left:auto;" v-if="!collapsed">
      <n-progress 
        type="circle" 
        style="width: 30px;" 
        :percentage="researchProgresses[r.key]" 
        :color="r.colorLight"
        :offset-degree="180"
      >
        <span class="research-level">{{ countCompletedResearches(r) + 1 }}</span>
      </n-progress>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { emitter } from '../../utilities/emitter';
import { useResearch } from '../../composables/useResearch';

const { research, findTopLevelResearchNode } = useResearch();
const researchProgresses = ref<{ [researchKey: string]: number }>({});

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const countCompletedResearches = (researchNode: any): number => {
  let count = researchNode.complete ? 1 : 0;

  if (researchNode.children) {
    for (const childKey in researchNode.children) {
      count += countCompletedResearches(researchNode.children[childKey]);
    }
  }

  return count;
};

const handleResearchProgressed = (event: { researchKey: string; progress?: number }) => {
  const topLevelResearch = findTopLevelResearchNode(event.researchKey);
  if (topLevelResearch) {
    researchProgresses.value[topLevelResearch.key] = event.progress ? event.progress : 0;
  }
};

onMounted(() => {
  emitter.on('researchProgressed', handleResearchProgressed);
  emitter.on('researchCompleted', handleResearchProgressed);
});

onBeforeUnmount(() => {
  emitter.off('researchProgressed', handleResearchProgressed);
  emitter.off('researchCompleted', handleResearchProgressed);
});
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.sidebar-icon {
  margin-right: 8px;
}

.research-level {
  font-family: 'Marcellus', sans-serif;
  font-weight: 400;
  font-size: 16px;
}
</style>

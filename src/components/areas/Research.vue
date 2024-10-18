<template>
  <n-scrollbar x-scrollable x-placement="top">
    <blocks-tree 
      :data="treeData" 
      :horizontal="false" 
      :collapsable="true"
    >
      <template #node="{ data }">
        <n-tooltip placement="bottom" trigger="hover" style="max-width: 100px;">
          <template #trigger>
            <n-button 
              size="small" 
              round
              ghost
              color="#d5d5d69D"
              :dashed="!data.known"
              :style="getButtonStyle(data)"
              @click="startResearch(data)"
            >
              <div class="button-content">
                <span v-if="data.known">
                  {{ data.label }}
                </span>
                <span v-else class="redacted-label">
                  {{ truncatedLabel(data.label) }}
                </span>
              </div>
            </n-button>
          </template>
          <span v-if="data.known">
            <span style="font-weight: bold;">{{ data.label }}</span><br />
            <span>This research will improve your skills in {{ data.label }}.</span>
          </span>
          <span v-else>
            <span style="font-weight: bold;">Unknown Research</span><br />
            <span>Explore the house to unlock this research</span>
          </span>
        </n-tooltip>
      </template>
    </blocks-tree>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useColorUtils } from '../../composables/useColorUtils';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';
import { researchArray } from '../../utilities/staticData';
import { CombinedResearch, StaticResearch, ResearchState } from '../../utilities/types';

const store = useStore();
const progressStyles = ref<{ [researchKey: string]: string }>({});
const { hexToRgba } = useColorUtils();

const enhanceResearchWithStoreData = (researchNodes: StaticResearch[], parentKey?: string): CombinedResearch[] => {
  return researchNodes
    .map(node => {
      const parent = parentKey || node.parent;
      const researchGroup = store.research.find(group => group.key === parent);
      const researchState = researchGroup?.researches.find(research => research.key === node.key) as ResearchState;

      const enhancedNode: CombinedResearch = {
        ...node,
        visible: researchState?.visible ?? false,
        known: researchState?.known ?? false,
        complete: researchState?.complete ?? false,
        children: node.children ? enhanceResearchWithStoreData(node.children, parent) : []
      };

      return enhancedNode;
    })
    .filter(node => node.visible);
};

const enhancedResearchArray = computed(() => enhanceResearchWithStoreData(researchArray));

const rootNode: CombinedResearch = {
  title: 'Research',
  key: 'research',
  colorDark: '#2b2f30',
  complete: true,
  known: true,
  visible: true,
  children: enhancedResearchArray.value
};

const buildTree = (node: CombinedResearch): any => ({
  label: node.title,
  key: node.key,
  color: node.colorDark,
  complete: node.complete,
  known: node.known,
  expand: true,
  children: node.children ? node.children.map(buildTree) : []
});

let treeData = reactive(buildTree(rootNode));

const truncatedLabel = (label: string) => {
  return label.length > 8 ? label.slice(0, 8) : label;
};

const handleResearchProgressed = (event: { researchKey: string; progress: number }) => {
  const researchNode = findResearchNode(treeData, event.researchKey);
  
  if (researchNode) {
    progressStyles.value[event.researchKey] = `linear-gradient(45deg, ${researchNode.color} ${event.progress}%, transparent 0%)`;
  }
};

const findResearchNode = (node: any, researchKey: string): any | null => {
  if (node.key === researchKey) {
    return node;
  }
  for (const child of node.children ?? []) {
    const found = findResearchNode(child, researchKey);
    if (found) return found;
  }
  return null;
};

const handleResearchCompleted = (event: {researchKey: string} ) => {
  updateTreeData(event.researchKey);
  progressStyles.value[event.researchKey] = '';
};

const updateTreeData = (researchKey: string) => {
  const updateNode = (node: any) => {
    if (node.key === researchKey) {
      node.complete = true;
    }
    node.children?.forEach(updateNode);
  };
  updateNode(treeData);
};

const startResearch = (data: CombinedResearch) => {
  if (!data.complete && data.known) {
    emitter.emit('researchStarted', { researchKey: data.key });
  }
};

onMounted(() => {
  emitter.on('researchProgressed', handleResearchProgressed);
  emitter.on('researchCompleted', handleResearchCompleted);
});

onBeforeUnmount(() => {
  emitter.off('researchProgressed', handleResearchProgressed);
  emitter.off('researchCompleted', handleResearchCompleted);
});

const getButtonStyle = (data: any) => {
  const transparentColor = hexToRgba(data.color, 0.2);
  return {
    width: '125px', 
    height: '75px', 
    backgroundColor: data.complete ? data.color : transparentColor, 
    color: '#d5d5d6',
    cursor: 'pointer',
    backgroundImage: progressStyles.value[data.key],
    transition: 'background 0.3s',
  };
};
</script>

<style>
  .org-tree-container {
    background-color: rgb(16, 16, 20) !important;
  }
  .org-tree-node-label-inner {
    padding: 0px !important;
  }
  .org-tree-node-btn {
    background-color: rgb(16, 16, 20) !important;
  }
  .button-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .redacted-label {
    font-family: 'Redacted Script', cursive;
    font-weight: 100;
    font-size: 26px;
  }
</style>

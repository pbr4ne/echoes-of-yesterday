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
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { useColorUtils } from '../../composables/useColorUtils';
import { useResearch } from '../../composables/useResearch';
import { emitter } from '../../utilities/emitter';

const { research } = useResearch();
const progressStyles = ref<{ [researchKey: string]: string }>({});
const { hexToRgba } = useColorUtils();

const rootNode = {
  title: 'Research',
  key: 'research',
  colorDark: '#2b2f30',
  complete: true,
  known: true,
  visible: true,
  children: research.value
};

const buildTree = (node: any, parentColorDark?: string): any => ({
  key: node.key,
  label: node.title,
  colorDark: node.colorDark || parentColorDark,
  complete: node.complete == undefined ? true : node.complete,
  known: node.known == undefined ? true : node.known,
  expand: true,
  children: node.children ? Object.values(node.children).map(child => buildTree(child, node.colorDark || parentColorDark)) : []
});

let treeData = reactive(buildTree(rootNode));

const truncatedLabel = (label: string) => {
  return label.length > 8 ? label.slice(0, 8) : label;
};

const handleResearchProgressed = (event: { researchKey: string; progress: number }) => {
  console.log('Progressing research:', event.researchKey, event.progress);
  const researchNode = findResearchNode(treeData, event.researchKey);
  
  if (researchNode) {
    progressStyles.value[event.researchKey] = `linear-gradient(45deg, ${researchNode.colorDark} ${event.progress}%, transparent 0%)`;
  }
};

const findResearchNode = (node: any, researchKey: string): any | null => {
  if (node.key === researchKey) {
    return node;
  }
  
  if (node.children) {
    for (const child of Object.values(node.children)) {
      const found = findResearchNode(child, researchKey);
      if (found) return found;
    }
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

const startResearch = (data: any) => {
  console.log(data);
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
  const transparentColor = hexToRgba(data.colorDark, 0.2);
  return {
    width: '125px', 
    height: '75px', 
    backgroundColor: data.complete ? data.colorDark : transparentColor, 
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

<template>
  <n-scrollbar x-scrollable x-placement="top">
    <blocks-tree 
      :data="treeData" 
      :horizontal="false" 
      :collapsable="true"
    >
      <template #node="{data,context}">
        <n-tooltip placement="bottom" trigger="hover" style="max-width: 100px;">
          <template #trigger>
            <n-card 
              size="small" 
              :style="{
                width: '125px', 
                height: '75px', 
                backgroundColor: data.complete ? data.color : '#101014', 
                color: data.complete ? '#d5d5d6' : data.color,
                cursor: 'pointer',
              }"
              @click="startResearch(data.key)"
            >
              <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                <span v-if="data.known">
                  {{ data.label }}
                </span>
                <span v-else-if="data.label.length % 2" style="font-family: 'Redacted Script', cursive; font-size: 26px;">
                  bwa bw
                </span>
                <span v-else style="font-family: 'Redacted Script', cursive; font-size: 26px;">
                  bw bwa
                </span>
              </div>
            </n-card>
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
import { reactive, computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';
import { CombinedResearch, Research, ResearchState } from '../../utilities/types';

const store = useStore();

const startResearch = (researchKey: string) => {
  emitter.emit('researchStarted', { researchKey: researchKey.slice(0, -1) });
};

const researchArray: Research[] = [
  {
    title: 'Sustenance',
    key: 'sustenance1',
    parent: 'sustenance',
    color: '#382736',
    children: [{ title: 'Cooking for one', key: 'sustenance2', color: '#382736' }]
  },
  {
    title: 'Fitness',
    key: 'fitness1',
    parent: 'fitness',
    color: '#403530',
    children: [{ title: 'Tae-bo', key: 'fitness2', color: '#403530' }]
  },
  {
    title: 'Recreation',
    key: 'recreation1',
    parent: 'recreation',
    color: '#2a3529',
    children: [{ title: '101 Jokes', key: 'recreation2', color: '#2a3529' }]
  },
  {
    title: 'Rest',
    key: 'rest1',
    parent: 'rest',
    color: '#2b3044',
    children: [{ title: 'Meditation', key: 'rest2', color: '#2b3044' }]
  },
  {
    title: 'Paranormal',
    key: 'paranormal1',
    parent: 'paranormal',
    color: '#1c1b24',
    children: [
      { title: 'Ghost hunting', key: 'paranormal2', color: '#1c1b24' },
      {
        title: 'Spiritualism',
        key: 'paranormal3',
        color: '#1c1b24',
        children: [
          {
            title: 'EMF reading',
            key: 'paranormal4',
            color: '#343237',
            children: [
              { title: 'Orbs', key: 'paranormal5', color: '#343237', children: [{ title: 'Test', key: 'paranormal6', color: '#343237' }] },
              { title: 'EVP', key: 'paranormal7', color: '#343237' }
            ]
          },
          { title: 'Rituals', key: 'paranormal8', color: '#343237' }
        ]
      }
    ]
  }
];

const enhanceResearchWithStoreData = (researchNodes: Research[], parentKey?: string): CombinedResearch[] => {
  return researchNodes.map(node => {
    const parent = parentKey || node.parent;
    const researchGroup = store.research.find(group => group.key === parent);

    const researchState = researchGroup?.researches.find(research => research.title === node.key) as ResearchState;

    const enhancedNode: CombinedResearch = {
      ...node,
      visible: researchState?.visible ?? false,
      known: researchState?.known ?? false,
      complete: researchState?.complete ?? false,
      children: node.children ? enhanceResearchWithStoreData(node.children, parent) : []
    };

    return enhancedNode;
  }).filter(node => node.visible);
};

const enhancedResearchArray = computed(() => enhanceResearchWithStoreData(researchArray));

const rootNode: CombinedResearch = {
  title: 'Research',
  key: 'research',
  color: '#2b2f30',
  complete: true,
  known: true,
  visible: true,
  children: enhancedResearchArray.value
};

const buildTree = (node: CombinedResearch): any => ({
  label: node.title,
  key: node.key,
  color: node.color,
  complete: node.complete,
  known: node.known,
  expand: true,
  children: node.children ? node.children.map(buildTree) : []
});

let treeData = reactive(buildTree(rootNode));

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
</style>

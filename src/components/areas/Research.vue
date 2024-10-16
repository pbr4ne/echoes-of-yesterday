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
                color: data.complete ? '#d5d5d6' : data.color
              }"
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
import { CombinedResearch, Research, ResearchState } from '../../utilities/types';

const store = useStore();

const researchArray: Research[] = [
  {
    title: 'Sustenance',
    key: 'hunger1',
    color: '#382736',
    children: [{ title: 'Cooking for one', key: 'hunger2', color: '#382736' }]
  },
  {
    title: 'Fitness',
    key: 'fitness1',
    color: '#403530',
    children: [{ title: 'Tae-bo', key: 'fitness2', color: '#403530' }]
  },
  {
    title: 'Entertainment',
    key: 'boredom1',
    color: '#2a3529',
    children: [{ title: '101 Jokes', key: 'boredom2', color: '#2a3529' }]
  },
  {
    title: 'Sleep',
    key: 'fatigue1',
    color: '#2b3044',
    children: [{ title: 'Meditation', key: 'fatigue2', color: '#2b3044' }]
  },
  {
    title: 'Paranormal',
    key: 'ghost1',
    color: '#1c1b24',
    children: [
      { title: 'Ghost hunting', key: 'ghost2', color: '#1c1b24' },
      {
        title: 'Spiritualism',
        key: 'ghost3',
        color: '#1c1b24',
        children: [
          {
            title: 'EMF reading',
            key: 'ghost4',
            color: '#343237',
            children: [
              { title: 'Orbs', key: 'ghost5', color: '#343237', children: [{ title: 'Test', key: 'ghost6', color: '#343237' }] },
              { title: 'EVP', key: 'ghost7', color: '#343237' }
            ]
          },
          { title: 'Rituals', key: 'ghost8', color: '#343237' }
        ]
      }
    ]
  }
];

const enhanceResearchWithStoreData = (researchNodes: Research[]): CombinedResearch[] => {
  return researchNodes
    .map(node => {
      const researchState: ResearchState = store.research[node.key as keyof typeof store.research];
      
      const enhancedNode: CombinedResearch = {
        ...node,
        visible: researchState?.visible,
        known: researchState?.known,
        complete: researchState?.complete,
        
        children: node.children ? enhanceResearchWithStoreData(node.children) : []
      };

      return enhancedNode;
    })
    .filter(node => node.visible);
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
  some_id: node.key,
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

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
              :style="{width: '125px', height: '75px', backgroundColor: data.backgroundColor}"
            >
              <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                <span>{{ data.label }}</span>
              </div>
            </n-card>
          </template>
          <span style="font-weight: bold;">Sustenance</span><br /><span>This book will increase your knowledge of how to feed yourself.</span>
        </n-tooltip>
      </template>
    </blocks-tree>
    <!-- <br /> -->
    <!-- <blocks-tree 
      :data="treeData" 
      :horizontal="false" 
      :collapsable="true" 
    >
      <template #node="{data,context}">
        <n-tooltip placement="bottom" trigger="hover" style="max-width: 100px;">
          <template #trigger>
            <n-icon-wrapper :size="32" :border-radius="10" :color="data.backgroundColor">
              <n-icon :size="18" class="tab-icon" color="#FFFFFFD1">
                <component :is="BookIcon" />
              </n-icon>
            </n-icon-wrapper>
          </template>
          <span style="font-weight: bold;">Sustenance</span><br /><span>This book will increase your knowledge of how to feed yourself.</span>
        </n-tooltip>
      </template>
    </blocks-tree> -->
  </n-scrollbar>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Research } from '../types';

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

const rootNode: Research = {
  title: 'Research',
  key: 'research',
  color: '#2b2f30',
  children: researchArray
};

const buildTree = (node: Research) => ({
  label: node.title,
  some_id: node.key,
  backgroundColor: node.color,
  expand: true,
  children: node.children ? node.children.map(buildTree) : []
});

let treeData = reactive(buildTree(rootNode));
</script>

<style>
  .org-tree-container {
    background-color: rgb(16, 16, 20);
  }
  .org-tree-node-label-inner {
    padding: 0px !important;
  }
  .org-tree-node-btn {
    background-color: rgb(16, 16, 20);
  }
</style>

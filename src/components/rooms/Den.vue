<template>
  <div>
    <blocks-tree 
      :data="treeData" 
      :horizontal="false" 
      :collapsable="true" 
    >
      <template #node="{data,context}">
        <n-card 
          size="small" 
          :style="{width: '125px', height: '75px', backgroundColor: data.backgroundColor}"
        >
          <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            {{ data.label }}
          </div>
        </n-card>
      </template>
    </blocks-tree>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  let treeData = reactive({
    label: 'Research',
    expand: true,
    some_id: 1,
    backgroundColor: '#2b2f30',
    children: [
      { 
        label: 'Sustenance', 
        some_id: 2,
        expand: true,
        backgroundColor: '#382736',
        children: [{ label: 'Cooking for one', some_id: 3, backgroundColor: '#382736' }]
      },
      { 
        label: 'Fitness', 
        some_id: 4,
        expand: true,
        backgroundColor: '#403530',
        children: [{ label: 'Tae-bo', some_id: 5, backgroundColor: '#403530' }]
      },
      { 
        label: 'Entertainment', 
        some_id: 6, 
        expand: true,
        backgroundColor: '#2a3529',
        children: [{ label: '101 Jokes', some_id: 7, backgroundColor: '#2a3529' }]
      },
      { 
        label: 'Sleep', 
        some_id: 8,
        expand: true,
        backgroundColor: '#2b3044',
        children: [{ label: 'Meditation', some_id: 9, backgroundColor: '#2b3044' }]
      },
      { 
        label: 'Paranormal', 
        some_id: 10, 
        expand: true, 
        backgroundColor: '#1c1b24',
        children: [
          { label: 'Ghost hunting', some_id: 11, backgroundColor: '#1c1b24' },
          {  
            label: 'Spiritualism', 
            some_id: 12, 
            expand: true, 
            backgroundColor: '#1c1b24',
            children: [
              { 
                label: 'EMF reading', 
                some_id: 13,
                expand: true,
                backgroundColor: '#343237',
                children: [
                  { label: 'Orbs', some_id: 14, backgroundColor: '#343237' },
                  { label: 'EVP', some_id: 15, backgroundColor: '#343237' }
                ]
              },
              { label: 'Rituals', some_id: 16, backgroundColor: '#343237' }
            ]
          }
        ]
      }
    ]
  });
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

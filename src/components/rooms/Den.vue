
<template>
  <div>
    <div>
        <blocks-tree :data="treeData" :horizontal="true" :collapsable="true"></blocks-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent,ref,reactive } from 'vue';

  let treeData = reactive({
      label: 'Research',
      expand: true,
      some_id: 1,
      children: [
          { 
            label: 'Sustenance', 
            some_id: 2,
            expand: true,
            children: [{ label: 'Cooking for one', some_id: 5 },]
          },
          { 
            label: 'Fitness', 
            some_id: 3,
            expand: true,
            children: [{ label: 'Tae-bo', some_id: 5 },]
          },
          { 
            label: 'Entertainment', 
            some_id: 2, 
            expand: true,
            children: [{ label: '101 Jokes', some_id: 5 },]
          },
          { 
            label: 'Sleep', 
            some_id: 3, 
            expand: true,
            children: [{ label: 'Meditation', some_id: 5 },]
          },
          { 
              label: 'Paranormal', 
              some_id: 4, 
              expand: false, 
              children: [
                  { label: 'Ghost hunting', some_id: 5 },
                  {  
                      label: 'Spiritualism', 
                      some_id: 6, 
                      expand: false, 
                      children: [
                          { label: 'EMF reading', some_id: 7 },
                          { label: 'Rituals', some_id: 8 },
                      ]
                  },
              ]
          },
      ]
  });

</script>

<style >
  .org-tree-container {
    background-color: rgb(16, 16, 20);
  }
  .org-tree-node-label-inner {
    box-shadow: none;
    border: 1px solid #ffd166;
    color: #ffd166;
  }
</style>

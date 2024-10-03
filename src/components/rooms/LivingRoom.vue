<template>
  <n-flex :size="[20, 20]">
    <n-card
      v-for="(card, cardIndex) in taskGroups"
      :key="cardIndex"
      :title="card.title"
      style="width: 200px; height: 200px;"
    >
      <n-flex vertical>
        <n-button
          v-for="task in card.tasks"
          :key="task.id"
          round
        >
          {{ task.label }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">

const taskGroups = [
  {
    title: 'Television',
    tasks: [
      { id: 'television', label: 'Watch Reruns' }
    ]
  },
  {
    title: 'Couch',
    tasks: [
      { id: 'sitOnCouch', label: 'Sit on Couch' },
      { id: 'takeANap', label: 'Take a Nap' },
      { id: 'stareIntoSpace', label: 'Stare into Space' }
    ]
  },
  {
    title: 'Lamp',
    tasks: [
      { id: 'turnOnLamp', label: 'Turn on Lamp' },
      { id: 'doSomething', label: 'Do Something' }
    ]
  }
];
</script>


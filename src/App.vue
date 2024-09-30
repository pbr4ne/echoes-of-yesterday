<template>
  <n-config-provider :theme="darkTheme">
    <div :style="{ backgroundColor: backgroundColor, height: '100vh' }">
      <n-tabs
      v-model:value="name"
      type="card"
      tab-style="min-width: 80px;"
      @close="handleClose"
    >
      <n-tab-pane
        v-for="panel in panels"
        :key="panel"
        :tab="panel.toString()"
        :name="panel"
      >
        <n-card size="small">
            Fear: {{ fear }}
          </n-card>
          <n-button type="primary" @click="startFearTimer" :disabled="fearTimerActive">Reduce Fear</n-button>
          <n-card size="small">
            <p v-if="fearTimerActive">Reducing fear in {{ fearTimer / 1000 }} seconds...</p>
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { darkTheme } from 'naive-ui';
  import { computed } from 'vue';

  const fear = ref(0); 
  const fearTimer = ref(0); 
  const fearTimerActive = ref(false);
  const randomEventTimer = ref(0);
  const name = ref('Living Room');
  const panels = ref(['Living Room', 'Kitchen', 'Bedroom'])

  let gameLoopInterval: ReturnType<typeof setInterval>;

  const startFearTimer = () => {
    if (!fearTimerActive.value) {
      fearTimer.value = 10000;
      fearTimerActive.value = true;
    }
  };

  const triggerRandomEvent = () => {
    fear.value += 1;
    randomEventTimer.value = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
  };

  const gameLoop = () => {
    const tickDuration = 100;

    if (fearTimerActive.value) {
      fearTimer.value -= tickDuration;
      if (fearTimer.value <= 0) {
        fear.value -= 1;
        fearTimer.value = 0;
        fearTimerActive.value = false;
      }
    }

    randomEventTimer.value -= tickDuration;
    if (randomEventTimer.value <= 0) {
      triggerRandomEvent();
    }
  };

  onMounted(() => {
    randomEventTimer.value = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
    gameLoopInterval = setInterval(gameLoop, 100);
  });

  onBeforeUnmount(() => {
    clearInterval(gameLoopInterval);
  });
    
  const backgroundColor = computed(() => {
    return darkTheme.common?.bodyColor;
  });
</script>
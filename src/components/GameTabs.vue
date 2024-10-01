<template>
  <n-tabs
    v-model:value="name"
    type="card"
    size="small"
    tab-style="padding: 7px"
  >
    <n-tab-pane
      v-for="(panel, index) in panels"
      :key="panel"
      :name="panel"
      style="padding: 20px;"
    >
      <template #tab>
        <n-icon class="tab-icon">
          <component :is="icons[index]" />
        </n-icon>
        <span v-if="showText" class="tab-text">{{ panel }}</span>
      </template>
      
      <n-flex :size="[20, 20]">
        <n-card style="width: 200px; height: 200px;" title="Television">
          <n-flex vertical>
              <n-button round
                :style="buttonProgressStyle(progress.television)"
                @click="startProgress('television')"
              >
                Watch Reruns
              </n-button>
          </n-flex>
        </n-card>

        <n-card style="width: 200px; height: 200px;" title="Couch">
          <n-flex vertical>
              <n-button round
                :style="buttonProgressStyle(progress.sitOnCouch)"
                @click="startProgress('sitOnCouch')"
              >
                Sit on Couch
              </n-button>
              
              <n-button round
                :style="buttonProgressStyle(progress.takeANap)"
                @click="startProgress('takeANap')"
              >
                Take a Nap
              </n-button>
              <n-button round
                :style="buttonProgressStyle(progress.stareIntoSpace)"
                @click="startProgress('stareIntoSpace')"
              >
                Stare into Space
              </n-button>
          </n-flex>
        </n-card>

        <n-card style="width: 200px; height: 200px;" title="Lamp">
          <n-flex vertical>
              <n-button round
                :style="buttonProgressStyle(progress.turnOnLamp)"
                @click="startProgress('turnOnLamp')"
              >
                Turn on Lamp
              </n-button>
              <n-button round
                :style="buttonProgressStyle(progress.doSomething)"
                @click="startProgress('doSomething')"
              >
                Do Something
              </n-button>
          </n-flex>
        </n-card>
      </n-flex>

    </n-tab-pane>
  </n-tabs>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NIcon } from 'naive-ui'

import LivingRoomIcon from '@vicons/tabler/Lamp'
import KitchenIcon from '@vicons/material/KitchenOutlined'
import BedroomIcon from '@vicons/ionicons5/BedOutline'
import SunroomIcon from '@vicons/tabler/Plant'
import BathroomIcon from '@vicons/material/ShowerOutlined'
import DenIcon from '@vicons/ionicons5/BookOutline'
import CrawlspaceIcon from '@vicons/fluent/ConferenceRoom24Regular'

const name = ref('Living Room')
const panels = ref(['Living Room', 'Kitchen', 'Bedroom', 'Sunroom', 'Bathroom', 'Den', 'Crawlspace'])
const icons = [
  LivingRoomIcon,
  KitchenIcon,
  BedroomIcon,
  SunroomIcon,
  BathroomIcon,
  DenIcon,
  CrawlspaceIcon
]

const showText = ref(window.innerWidth > 650)

const updateShowText = () => {
  showText.value = window.innerWidth > 650
}

onMounted(() => {
  window.addEventListener('resize', updateShowText)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateShowText)
})

const progress = ref({
  television: 0,
  sitOnCouch: 0,
  takeANap: 0,
  stareIntoSpace: 0,
  turnOnLamp: 0,
  doSomething: 0
})

const startProgress = (key: keyof typeof progress.value) => {
  if (progress.value[key] === 100) return
  const interval = setInterval(() => {
    if (progress.value[key] < 100) {
      progress.value[key] += 1;
    } else {
      clearInterval(interval);
      progress.value[key] = 0;
    }
  }, 50);
}

const buttonProgressStyle = (progressValue: number) => ({
  backgroundImage: `linear-gradient(90deg, #43738B ${progressValue}%, transparent 0%)`,
  transition: 'background 0.3s'
})
</script>

<style scoped>
  .tab-icon {
    margin-right: 8px;
    font-size: 20px;
  }

  .tab-text {
    vertical-align: middle;
  }
</style>

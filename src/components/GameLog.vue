<template>
  <n-space vertical style="padding: 20px; position: relative;" @mouseenter="showTrash = true" @mouseleave="showTrash = false">
    <n-icon
      class="trash-icon"
      size="24"
      :style="{ opacity: showTrash ? 1 : 0, pointerEvents: showTrash ? 'auto' : 'none' }"
      @click="clearLog"
    >
      <component :is="TrashIcon" />
    </n-icon>

    <n-timeline>
      <n-timeline-item
        v-for="(item, index) in timelineItems"
        :key="index"
        :content="!collapsed ? item.content : ' '"
        :time="!collapsed ? item.time : ' '"
        line-type="dashed"
      >
        <template #icon>
          <n-icon size="24">
            <component :is="item.icon" />
          </n-icon>
        </template>
      </n-timeline-item>
    </n-timeline>
  </n-space>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../composables/useStore';
import TrashIcon from '@vicons/tabler/Trash';
import LivingRoomIcon from '@vicons/tabler/Lamp';
import KitchenIcon from '@vicons/material/KitchenOutlined';
import BedroomIcon from '@vicons/ionicons5/BedOutline';
import SunroomIcon from '@vicons/tabler/Plant';
import BathroomIcon from '@vicons/material/ShowerOutlined';
import DenIcon from '@vicons/ionicons5/BookOutline';
import CrawlspaceIcon from '@vicons/fluent/ConferenceRoom24Regular';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const showTrash = ref(false);

const roomIcons: Record<string, any> = {
  Kitchen: KitchenIcon,
  Bedroom: BedroomIcon,
  Sunroom: SunroomIcon,
  Den: DenIcon,
  LivingRoom: LivingRoomIcon,
  Cellar: CrawlspaceIcon,
  Bathroom: BedroomIcon
};

const store = useStore();

const timelineItems = computed(() => {
  return store.log.slice().reverse().map((entry) => {
    return {
      content: entry.description,
      time: entry.time,
      icon: roomIcons[entry.room],
    };
  });
});

const clearLog = () => {
  store.clearLog();
};
</script>

<style scoped>
  .trash-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 10;
    transition: opacity 0.2s ease;
  }

  .n-space {
    position: relative;
  }
</style>

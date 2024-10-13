<template>
  <n-space vertical style="padding: 20px;">
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
import { computed } from 'vue';
import { useStore } from '../composables/useStore';
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
      icon: roomIcons[entry.room]
    };
  });
});
</script>

<style scoped>
  .n-timeline-item {
    min-height: 58.5px;
  }
</style>

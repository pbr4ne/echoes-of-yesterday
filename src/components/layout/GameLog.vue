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
import { useStore } from '../../composables/useStore';
import { useRooms } from '../../composables/useRooms';
import { Calendar } from '../../utilities/types';
import TrashIcon from '@vicons/tabler/Trash';

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const showTrash = ref(false);

const store = useStore();
const { rooms } = useRooms();

function getRelativeTime(logTime: Calendar, currentTime: Calendar) {
  const diffDays = currentTime.days - logTime.days;
  const diffHours = currentTime.hours - logTime.hours;
  const diffMinutes = currentTime.minutes - logTime.minutes;

  if (diffDays < 1 && diffHours < 1 && diffMinutes < 60) {
    return 'Just now';
  } else if (diffDays < 1 && diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffDays < 30) {
    const weeksAgo = Math.floor(diffDays / 7);
    return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const monthsAgo = Math.floor(diffDays / 30);
    return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
  }
}

const timelineItems = computed(() => {
  const currentTime = {
    days: store.calendar.days,
    hours: store.calendar.hours,
    minutes: store.calendar.minutes
  };

  return store.log.slice().reverse().map((entry) => {
    const relativeTime = getRelativeTime(entry.time, currentTime);

    return {
      content: entry.description,
      time: relativeTime,
      icon:  rooms.value.find(room => room.key === entry.room)?.icon,
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

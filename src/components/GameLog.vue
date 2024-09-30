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
import { defineProps } from 'vue';
import KitchenIcon from '@vicons/material/KitchenOutlined';
import BedroomIcon from '@vicons/ionicons5/BedOutline';
import SunroomIcon from '@vicons/tabler/Plant';
import DenIcon from '@vicons/ionicons5/BookOutline';

const { collapsed } = defineProps({
    collapsed: {
        type: Boolean,
        required: true,
    },
});

const timelineItems = [
    { content: 'Took a nap', time: 'Just now', icon: BedroomIcon },
    { content: 'Strange noise', time: 'About an hour ago', icon: SunroomIcon },
    { content: 'Research complete', time: 'Yesterday', icon: DenIcon },
    { content: 'Strange lights', time: 'Last week', icon: KitchenIcon }
];
</script>

<style scoped>
    .n-timeline-item {
        min-height: 58.5px;
    }
</style>

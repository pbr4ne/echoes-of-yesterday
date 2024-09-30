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
        >
            <template #tab>
                <n-icon class="tab-icon">
                    <component :is="icons[index]" />
                </n-icon>
                <span class="tab-text">{{ panel }}</span>
            </template>

            {{ panel }}
        </n-tab-pane>
    </n-tabs>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
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
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&display=swap');

    .eoyHeader {
        font-family: 'Fondamento', sans-serif;
        font-size: 40px;
        padding-right: 5px;
        padding-left: 5px;
    }

    .tab-icon {
        margin-right: 8px;
        font-size: 20px;
    }

    .tab-text {
        vertical-align: middle
    }
</style>

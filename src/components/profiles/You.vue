<template>
  <n-flex vertical :size="[20, 20]">
    <n-avatar round :size="200">
      <div style="width: 150px;">
        <img :src="profileSvg" alt="profile"/>
      </div>
    </n-avatar>

    <n-thing style="min-width: 200px; max-width: 600px; flex: 1 1 0; margin-top: 20px; margin-right: 40px;">
      <template #header>
        You
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      <span></span>
    </n-thing>

    <!-- <div style="min-width: 200px; max-width: 600px; flex: 1 1 0; margin-top: 20px; margin-right: 40px;">
      <div v-for="(item, index) in stats" :key="item.key" class="stats-item">
        <n-icon size="24" class="stats-icon">
          <component :is="item.icon" />
        </n-icon>
        <div class="progress-wrapper">
          <n-progress
            :percentage="item.percentage"
            type="line"
            :height="20"
            :color="getProgressColor(item.percentage)"
            :show-indicator="false"
          />
          <div class="progress-label">
            <span class="progress-text" :style="{ color: getTextColor() }">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div> -->

    <n-collapse>
      <n-collapse-item
        v-for="(item, index) in stats"
        :key="item.key"
      >
        <template #header>
          <n-icon size="24" class="stats-icon">
            <component :is="item.icon" />
          </n-icon>
          <div class="progress-wrapper">
            <n-progress
              :percentage="item.percentage"
              type="line"
              :height="20"
              :color="getProgressColor(item.percentage)"
              :show-indicator="false"
            />
            <div class="progress-label">
              <span class="progress-text" :style="{ color: getTextColor() }">{{ item.label }}</span>
            </div>
          </div>
        </template>

        <n-card>
          <n-thing>
            <template #avatar>
              <n-icon size="36">
                <component :is="item.icon" />
              </n-icon>
            </template>
            <template #header>
              {{ item.label }}
            </template>
            <template #header-extra>
              <n-icon size="24" :color="getProgressColor(item.percentage)">
                <HappyIcon />
              </n-icon>
            </template>
            <template #description>
              description
            </template>
            <template #footer>
              <div class="progress-wrapper">
                <n-progress
                  :percentage="item.percentage"
                  type="line"
                  :height="20"
                  :color="getProgressColor(item.percentage)"
                  :show-indicator="false"
                />
                <div class="progress-label">
                  <span class="progress-text" :style="{ color: getTextColor() }">{{ item.percentage }}/100</span>
                </div>
              </div>
            </template>
            <template #action>
              <div style="display: flex; align-items: center; gap: 16px;">
                <n-avatar-group :options="options" :size="40">
                  <template #avatar="{ option: { name, description, icon, color } }">
                    <n-tooltip>
                      <template #trigger>
                        <n-avatar :color="color" round>
                          <n-icon :component="icon" />
                        </n-avatar>
                      </template>
                      <n-thing>
                        <template #description>
                          {{ name }}
                        </template>
                        {{ description }}
                      </n-thing>
                    </n-tooltip>
                  </template>
                </n-avatar-group>
                <n-statistic label="net" value="+1/s" />
              </div>
            </template>
          </n-thing>
        </n-card>
      </n-collapse-item>
    </n-collapse>


    <n-list bordered hoverable>
      <template #header>
        <n-thing>
          <template #avatar>
            <n-avatar round>
              <n-icon><InventoryIcon /></n-icon>
            </n-avatar>
          </template>
          <template #header>
            <span class="inventoryHeader">Inventory</span>
          </template>
        </n-thing>
      </template>
      <n-list-item v-for="(value, key) in inventory" :key="key">
        <!-- <template #prefix>
          <component :is="renderIcon(SunIcon)" />
        </template> -->
        {{ key }}
        <template #suffix>
          {{ value }}
        </template>
      </n-list-item>
    </n-list>
  </n-flex>
</template>

<script setup lang="ts">
import { useStats } from '../../composables/useStats';
import { useInventory } from '../../composables/useInventory';
import InventoryIcon from '@vicons/fluent/Backpack48Regular';
import HappyIcon from '@vicons/tabler/MoodHappy';
import ConfusedIcon from '@vicons/tabler/MoodConfuzed';
import CryIcon from '@vicons/tabler/MoodCry';
import NervousIcon from '@vicons/tabler/MoodNervous';
import profileSvg from '@/assets/profile.svg';

const { stats, getProgressColor, getTextColor } = useStats();
const { inventory } = useInventory();

const options = [
  {
    name: '-2 Hunger/s',
    description: 'From being starving',
    icon: HappyIcon,
    color: '#384c5e',
  },
  {
    name: '-1 Hunger/s',
    description: 'From not having enough food in the fridge',
    icon: ConfusedIcon,
    color: '#327d66',
  },
  {
    name: '+1 Hunger/s',
    description: 'From having a balanced diet',
    icon: CryIcon,
    color: '#688a4e',
  },
  {
    name: '+2 Hunger/s',
    description: 'From having a delicious meal',
    icon: NervousIcon,
    color: '#a68432',
  },
];
</script>

<style scoped>
.stats-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.stats-icon {
  margin-right: 8px;
}

.progress-wrapper {
  position: relative;
  flex-grow: 1;
  margin-left: 8px;
  width: 100%;
}

.progress-label {
  position: absolute;
  top: 0;
  left: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.n-progress {
  width: 100%;
}

.n-card {
  min-width: 200px;
  max-width: 400px;
  margin-top: 20px;
}

.n-collapse {
  min-width: 200px;
  max-width: 400px;
}

.n-list {
  width: 200px;
  max-width: 200px;
  margin-top: 20px;
}

.inventoryHeader {
  font-size: 20px;
  font-weight: 200;
  font-style: normal;
}
</style>

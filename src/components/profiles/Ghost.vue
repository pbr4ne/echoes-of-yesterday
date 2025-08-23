<template>
  <n-flex vertical :size="[20, 20]">
    <n-space>
      <n-avatar round :size="200">
        <div style="padding: 20px;">
          <n-icon :component="ghost.icon" color="#d5d5d6" />
        </div>
      </n-avatar>
      <n-space vertical style="padding: 20px;">
        <div>
          <span class="tag-label">Type</span><n-tag>{{ getType(ghost) }}</n-tag>
        </div>
        <div>
          <span class="tag-label">Name</span><n-tag>{{ getName(ghost) }}</n-tag>
        </div>
        <div>
          <span class="tag-label">Stage</span><n-tag>{{ ghost.state }}</n-tag>
        </div> 
        <div>
          <span class="tag-label">Active</span><n-tag>{{ ghost.active.activeRoom ? toTitleCase(ghost.active.activeRoom) : 'No' }}</n-tag>
        </div>
      </n-space>
    </n-space>

    <n-space justify="space-around" >
      <n-statistic label="Favoured Room">
        <n-avatar bordered size="large" class="avatar-icons">
          <n-icon :component="getIconForRoom(ghost.favouredRoom)" />
        </n-avatar>
      </n-statistic>
      <n-statistic label="Favoured Item">
        <n-avatar bordered size="large" class="avatar-icons">
          <n-icon :component="null" />
        </n-avatar>
      </n-statistic>
    </n-space>
    
    <n-card>
      <p>{{ ghost.description[0] }}</p>
      <p class="redacted">{{ ghost.description[1] }}</p>
      <p class="redacted">{{ ghost.description[2] }}</p>
      <p class="redacted">{{ ghost.description[3] }}</p>
    </n-card>

  </n-flex>
</template>
<script setup lang="ts">
import { useRooms } from '../../composables/useRooms';
import { useGhosts } from '../../composables/useGhosts';
import { useText } from '../../composables/useText';

const { getIconForRoom } = useRooms();
const { toTitleCase } = useText();

const { ghost } = defineProps({
  ghost: {
    type: Object,
    required: true,
  },
});

const { getName, getType } = useGhosts();
</script>
<style scoped>
  .n-card {
    width: 90%;
  }

  .redacted {
    font-family: 'Redacted Script', cursive;
  }

  .tag-label {
    color: rgba(255, 255, 255, 0.52);
    width: 50px;
    display: inline-block;
  }

  .icon-label {
    color: rgba(255, 255, 255, 0.52);
    width: 110px;
    display: inline-block;
  }

  .avatar-icons {
    --n-border-radius: 5px !important;
    --n-border: 2px solid #d5d5d6 !important;
    width: 50px;
    height: 50px;
  }
</style>
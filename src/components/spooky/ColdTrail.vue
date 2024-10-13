<template>
  <div class="cursor-trail-container">
    <div
      v-for="(snowflake, index) in snowflakes"
      :key="snowflake.id"
      :class="'snowflake snowflake-' + snowflake.id"
      :style="getSnowflakeStyle(snowflake)"
    >
      <div class="snowflake-line"></div>
      <div class="snowflake-line rotated-60"></div>
      <div class="snowflake-line rotated-120"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { CSSProperties } from 'vue';
import gsap from 'gsap';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
}

const snowflakes = ref<Snowflake[]>([]);
const isTouchDevice = ref(false);

const createSnowflake = (x: number, y: number) => {
  const snowflake: Snowflake = {
    id: Math.floor(Date.now() + Math.random() * 1000),
    x,
    y,
    size: Math.random() * (30 - 10) + 10,
  };

  snowflakes.value.push(snowflake);

  nextTick(() => {
    gsap.to(`.snowflake-${snowflake.id}`, {
      y: isTouchDevice.value ? "+=300" : "+=100",
      opacity: 0,
      duration: 3,
      ease: "power1.out",
      onComplete: () => {
        const el = document.querySelector(`.snowflake-${snowflake.id}`);
        if (el) {
          el.remove();
        }
      },
    });
  });
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isTouchDevice.value && Math.random() > 0.95) {
    createSnowflake(event.clientX, event.clientY);
  }
};

const createSnowflakesForTouch = () => {
  const screenWidth = window.innerWidth;
  const randomX = Math.random() * screenWidth;
  createSnowflake(randomX, 0);
};

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || window.matchMedia('(max-width: 768px)').matches;

  if (isTouchDevice.value) {
    const touchInterval = setInterval(createSnowflakesForTouch, 1000);
    onBeforeUnmount(() => clearInterval(touchInterval));
  } else {
    window.addEventListener('mousemove', handleMouseMove);
  }
});

onBeforeUnmount(() => {
  if (!isTouchDevice.value) {
    window.removeEventListener('mousemove', handleMouseMove);
  }
});

const getSnowflakeStyle = (snowflake: Snowflake): CSSProperties => {
  return {
    position: "absolute",
    left: `${snowflake.x}px`,
    top: `${snowflake.y}px`,
    width: `${snowflake.size}px`,
    height: `${snowflake.size}px`,
    transform: "translate(-50%, -50%)",
  };
};
</script>

<style scoped>
.cursor-trail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
}

.snowflake {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.snowflake-line {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}

.rotated-60 {
  transform: rotate(60deg);
}

.rotated-120 {
  transform: rotate(120deg);
}
</style>

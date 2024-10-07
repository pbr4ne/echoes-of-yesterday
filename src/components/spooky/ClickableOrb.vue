<template>
  <div ref="orb" class="floating-orb" @click="onOrbClick"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const orb = ref<HTMLElement | null>(null);

const moveOrb = () => {
  if (orb.value) {
    gsap.to(orb.value, {
      x: () => Math.random() * (window.innerWidth - 50),
      y: () => Math.random() * (window.innerHeight - 50),
      duration: 5,
      ease: 'power1.inOut',
      onComplete: moveOrb,
    });
  }
};

const onOrbClick = () => {
  if (orb.value) {
    gsap.to(orb.value, { scale: 0.5, duration: 0.2 });
    gsap.to(orb.value, { scale: 1, duration: 0.5, delay: 0.2 });
  }
};

onMounted(() => {
  if (orb.value) {
    moveOrb();
  }
});
</script>

<style scoped>
.floating-orb {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  z-index: 2000;
  cursor: pointer;
  pointer-events: all;
}
</style>

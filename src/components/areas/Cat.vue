<template>
  <n-button
    round 
    class="cat-button" 
    @click="unfocusButton($event); onCatClick($event)"
  >
    <img :src="src" alt="cat" />
    <span class="meow-label">meow!</span>
  </n-button>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{src: string}>();

function unfocusButton(event: Event) {
  const el = event.currentTarget as HTMLElement;
  requestAnimationFrame(() => el.blur());
}

function onCatClick(e: MouseEvent) {
  const button = e.currentTarget as HTMLElement;
  const label = button.querySelector('.meow-label') as HTMLElement | null;
  if (!label) {
    return;
  }

  gsap.killTweensOf(label);

  gsap.fromTo(
    label,
    { opacity: 0, y: 0 },
    {
      opacity: 1,
      y: -24,
      duration: 0.6,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(label, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  );
}
</script>

<style scoped>
  .cat-button {
    position: absolute;
    right: -20px;
    bottom: -15px;
    padding: 0;
  }

  .cat-button {
    --n-border: none !important;
  }

  .meow-label {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #63e2b7;
    pointer-events: none;
    opacity: 0;
    white-space: nowrap;
  }
</style>
import { ref } from 'vue';

const paused = ref(false)

export const useTime = () => ({ paused }) //singleton
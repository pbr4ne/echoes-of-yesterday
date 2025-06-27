import { ref } from 'vue'

const paused = ref(false);
const pausedTotal = ref(0);
let   pausedAt: number | null = null;

const gameNow = () => Date.now() - pausedTotal.value;

const pause = () => {
	if (paused.value) return;
	paused.value  = true;
	pausedAt = Date.now();
}

const resume = () => {
	if (!paused.value || pausedAt === null) return;
	pausedTotal.value += Date.now() - pausedAt;
	paused.value  = false;
	pausedAt = null;
}

export const useTime = () => ({ paused, gameNow, pause, resume })

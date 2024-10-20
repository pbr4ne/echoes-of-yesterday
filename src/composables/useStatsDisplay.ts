import { computed } from 'vue';
import { useStore } from './useStore';
import HungerIcon from '@vicons/tabler/Cheese';
import FrailtyIcon from '@vicons/tabler/Barbell';
import BoredomIcon from '@vicons/tabler/DeviceTv';
import FatigueIcon from '@vicons/fluent/Sleep24Regular';
import FearIcon from '@vicons/antd/ExclamationCircleOutlined';

export const useStatsDisplay = () => {
  const gameStore = useStore();

  const stats = computed(() => [
    { label: 'Hunger', key: 'hunger', icon: HungerIcon, percentage: gameStore.stats.hunger.percentage },
    { label: 'Frailty', key: 'frailty', icon: FrailtyIcon, percentage: gameStore.stats.frailty.percentage },
    { label: 'Boredom', key: 'boredom', icon: BoredomIcon, percentage: gameStore.stats.boredom.percentage },
    { label: 'Fatigue', key: 'fatigue', icon: FatigueIcon, percentage: gameStore.stats.fatigue.percentage },
    { label: 'Fear', key: 'fear', icon: FearIcon, percentage: gameStore.stats.fear.percentage }
  ]);

  const getProgressColor = (percentage: number) => {
    if (percentage <= 14) {
      return '#577590';
    } else if (percentage <= 28) {
      return '#43aa8b';
    } else if (percentage <= 42) {
      return '#90be6d';
    } else if (percentage <= 57) {
      return '#f9c74f';
    } else if (percentage <= 71) {
      return '#f8961e';
    } else if (percentage <= 85) {
      return '#f3722c';
    } else {
      return '#f94144';
    }
  };

  const getTextColor = () => {
    return '#FFFFFFD1';
  };

  return {
    stats,
    getProgressColor,
    getTextColor,
  };
};

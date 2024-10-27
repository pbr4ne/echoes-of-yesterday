import { computed } from 'vue';
import { useStore } from './useStore';
import HungerIcon from '@vicons/tabler/Cheese';
import FrailtyIcon from '@vicons/tabler/Barbell';
import BoredomIcon from '@vicons/tabler/DeviceTv';
import FatigueIcon from '@vicons/fluent/Sleep24Regular';
import FearIcon from '@vicons/antd/ExclamationCircleOutlined';

export const useStats = () => {
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
      return '#384c5e';
    } else if (percentage <= 28) {
      return '#327d66';
    } else if (percentage <= 42) {
      return '#688a4e';
    } else if (percentage <= 57) {
      return '#a68432';
    } else if (percentage <= 71) {
      return '#b37529';
    } else if (percentage <= 85) {
      return '#a15025';
    } else {
      return '#9c2c2d';
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

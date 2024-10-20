import { computed } from 'vue';
import { useStore } from './useStore';
import PoltergeistIcon from '@vicons/tabler/Tornado';
import OrbIcon from '@vicons/tabler/ChartBubble';
import WraithIcon from '@vicons/tabler/Atom2';
import SpiritIcon from '@vicons/material/AutoAwesomeOutlined';
import PhantomIcon from '@vicons/carbon/WindySnow';

export const useGhostsDisplay = () => {
  const gameStore = useStore();

  const ghosts = computed(() => [
    { 
      key: 'poltergeist', 
      type: 'Poltergeist', 
      name: 'Poltergeist Name',
      icon: PoltergeistIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: gameStore.ghosts.poltergeist.isActive,
        activeRoom: gameStore.ghosts.poltergeist.activeRoom,
        activeDuration: gameStore.ghosts.poltergeist.activeDuration,
        activationStart: gameStore.ghosts.poltergeist.activationStart
      },
      state: gameStore.ghosts.poltergeist.state,
    },
    { 
      key: 'orb', 
      type: 'Orb', 
      name: 'Orb Name',
      icon: OrbIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: gameStore.ghosts.orb.isActive,
        activeRoom: gameStore.ghosts.orb.activeRoom,
        activeDuration: gameStore.ghosts.orb.activeDuration,
        activationStart: gameStore.ghosts.orb.activationStart
      },
      state: gameStore.ghosts.orb.state,
    },
    { 
      key: 'wraith', 
      type: 'Wraith', 
      name: 'Wraith Name',
      icon: WraithIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: gameStore.ghosts.wraith.isActive,
        activeRoom: gameStore.ghosts.wraith.activeRoom,
        activeDuration: gameStore.ghosts.wraith.activeDuration,
        activationStart: gameStore.ghosts.wraith.activationStart
      },
      state: gameStore.ghosts.wraith.state,
    },
    { 
      key: 'spirit', 
      type: 'Spirit', 
      name: 'Spirit Name',
      icon: SpiritIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: gameStore.ghosts.spirit.isActive,
        activeRoom: gameStore.ghosts.spirit.activeRoom,
        activeDuration: gameStore.ghosts.spirit.activeDuration,
        activationStart: gameStore.ghosts.spirit.activationStart
      },
      state: gameStore.ghosts.spirit.state,
    },
    { 
      key: 'phantom', 
      type: 'Phantom', 
      name: 'Phantom Name',
      icon: PhantomIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: gameStore.ghosts.phantom.isActive,
        activeRoom: gameStore.ghosts.phantom.activeRoom,
        activeDuration: gameStore.ghosts.phantom.activeDuration,
        activationStart: gameStore.ghosts.phantom.activationStart
      },
      state: gameStore.ghosts.phantom.state,
    }
  ]);

  return {
    ghosts,
  };
};

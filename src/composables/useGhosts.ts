import { computed } from 'vue';
import { useStore } from './useStore';
import PoltergeistIcon from '@vicons/tabler/Tornado';
import OrbIcon from '@vicons/tabler/ChartBubble';
import WraithIcon from '@vicons/tabler/Atom2';
import SpiritIcon from '@vicons/material/AutoAwesomeOutlined';
import PhantomIcon from '@vicons/carbon/WindySnow';

export const useGhosts = () => {
  const store = useStore();

  const ghosts = computed(() => [
    { 
      key: 'poltergeist', 
      type: 'Poltergeist', 
      name: 'Poltergeist-',
      icon: PoltergeistIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: store.ghosts.poltergeist.isActive,
        activeRoom: store.ghosts.poltergeist.activeRoom,
        activeDuration: store.ghosts.poltergeist.activeDuration,
        activationStart: store.ghosts.poltergeist.activationStart
      },
      state: store.ghosts.poltergeist.state,
      description: [
        'Description when encountered. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Description when identified. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Description when communicated. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Description when befriended or banished. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    },
    { 
      key: 'orb', 
      type: 'Orb', 
      name: 'Orb-',
      icon: OrbIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: store.ghosts.orb.isActive,
        activeRoom: store.ghosts.orb.activeRoom,
        activeDuration: store.ghosts.orb.activeDuration,
        activationStart: store.ghosts.orb.activationStart
      },
      state: store.ghosts.orb.state,
      description: [
        'Description when encountered. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Description when identified. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Description when communicated. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Description when befriended or banished. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    },
    { 
      key: 'wraith', 
      type: 'Wraith', 
      name: 'Wraith-',
      icon: WraithIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: store.ghosts.wraith.isActive,
        activeRoom: store.ghosts.wraith.activeRoom,
        activeDuration: store.ghosts.wraith.activeDuration,
        activationStart: store.ghosts.wraith.activationStart
      },
      state: store.ghosts.wraith.state,
      description: [
        'Description when encountered. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Description when identified. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Description when communicated. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Description when befriended or banished. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    },
    { 
      key: 'spirit', 
      type: 'Spirit', 
      name: 'Spirit-',
      icon: SpiritIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: store.ghosts.spirit.isActive,
        activeRoom: store.ghosts.spirit.activeRoom,
        activeDuration: store.ghosts.spirit.activeDuration,
        activationStart: store.ghosts.spirit.activationStart
      },
      state: store.ghosts.spirit.state,
      description: [
        'Description when encountered. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Description when identified. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Description when communicated. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Description when befriended or banished. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    },
    { 
      key: 'phantom', 
      type: 'Phantom', 
      name: 'Phantom-',
      icon: PhantomIcon, 
      favouredRoom: 'Kitchen',
      favouredItem: 'idk',
      active: {
        isActive: store.ghosts.phantom.isActive,
        activeRoom: store.ghosts.phantom.activeRoom,
        activeDuration: store.ghosts.phantom.activeDuration,
        activationStart: store.ghosts.phantom.activationStart
      },
      state: store.ghosts.phantom.state,
      description: [
        'Description when encountered. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Description when identified. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Description when communicated. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Description when befriended or banished. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    }
  ]);

  const getTagColor = (state: string) => {
    switch (state) {
      case 'Unknown':
        return { borderColor: '#8b8763', textColor: '#8b8763' };
      case 'Encountered':
        return { borderColor: '#8b8763', textColor: '#8b8763' };
      case 'Identified':
        return { borderColor: '#8a9574', textColor: '#8a9574' };
      case 'Communicated':
        return { borderColor: '#99b182', textColor: '#99b182' };
      case 'Befriended':
        return { borderColor: '#d7dd99', textColor: '#b7bd83' };
      case 'Banished':
        return { borderColor: '#d7dd99', textColor: '#d7dd99' };
      default:
        return { borderColor: '#8b8763', textColor: '#8b8763' };
    }
  };
  
  const getLabel = (ghost: any) => {
    if (ghost.state === 'Encountered') {
      return '???';
    } 
    else if (ghost.state === 'Befriended' || ghost.state === 'Banished') {
      return ghost.name;
    } 
    else {
      return ghost.key.charAt(0).toUpperCase() + ghost.key.slice(1);
    }
  };

  const activateGhost = (ghostKey: keyof typeof store.ghosts, duration: number) => {
    console.log(`Activating ${ghostKey} for ${duration}ms`);
    const rooms = ['Bathroom', 'Bedroom', 'Cellar', 'Den', 'Kitchen', 'LivingRoom', 'Sunroom'];
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];

    store.ghosts[ghostKey].isActive = true;
    store.ghosts[ghostKey].activeRoom = randomRoom;
    store.ghosts[ghostKey].activeDuration = duration;
    store.ghosts[ghostKey].activationStart = Date.now();

    const ghostDescriptions: Record<keyof typeof store.ghosts, string> = {
      poltergeist: 'Strange noise',
      orb: 'Strange lights',
      wraith: 'Eerie flicker',
      spirit: 'Whispering sound',
      phantom: 'Cold breeze'
    };

    const description = ghostDescriptions[ghostKey];

    const logTime = {
      days: store.calendar.days,
      hours: store.calendar.hours,
      minutes: store.calendar.minutes
    };

    store.log.push({
      description,
      time: logTime,
      room: randomRoom
    });
  };

  const deactivateGhost = (ghostKey: keyof typeof store.ghosts) => {
    store.ghosts[ghostKey].isActive = false;
    store.ghosts[ghostKey].activeRoom = null;
    store.ghosts[ghostKey].activeDuration = null;
    store.ghosts[ghostKey].activationStart = null;
  };

  return { activateGhost, deactivateGhost, ghosts, getTagColor, getLabel };
};

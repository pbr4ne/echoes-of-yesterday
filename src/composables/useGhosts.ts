import { DefineComponent, computed } from 'vue';
import { useStore } from './useStore';
import { useRooms } from './useRooms';
import { useDevices } from './useDevices';
import { useTime } from './useTime';
import { GhostDisplay, GhostKey } from '../utilities/types';
import PoltergeistIcon from '@vicons/tabler/Tornado';
import OrbIcon from '@vicons/tabler/ChartBubble';
import WraithIcon from '@vicons/tabler/Atom2';
import SpiritIcon from '@vicons/material/AutoAwesomeOutlined';
import PhantomIcon from '@vicons/carbon/WindySnow';

export const useGhosts = () => {
  const store = useStore();
  const { ghostDeviceCommunication } = useDevices();
  const { rooms } = useRooms();
  const { gameNow } = useTime();

  const ghosts = computed<GhostDisplay[]>(() => [
    { 
      key: 'poltergeist', 
      type: 'Poltergeist', 
      name: 'Poltergeist-',
      icon: PoltergeistIcon as DefineComponent, 
      favouredRoom: 'living',
      favouredDevice: 'tv',
      active: {
        isActive: store.ghosts.poltergeist.active.isActive,
        activeRoom: store.ghosts.poltergeist.active.activeRoom,
        activeDuration: store.ghosts.poltergeist.active.activeDuration,
        activationStart: store.ghosts.poltergeist.active.activationStart
      },
      state: store.ghosts.poltergeist.state,
      deviceInteractions: store.ghosts.poltergeist.deviceInteractions,
      deviceCommunication: ghostDeviceCommunication.poltergeist.deviceCommunication,
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
      icon: OrbIcon as DefineComponent, 
      favouredRoom: 'bedroom',
      favouredDevice: 'blackLight',
      active: {
        isActive: store.ghosts.orb.active.isActive,
        activeRoom: store.ghosts.orb.active.activeRoom,
        activeDuration: store.ghosts.orb.active.activeDuration,
        activationStart: store.ghosts.orb.active.activationStart
      },
      state: store.ghosts.orb.state,
      deviceInteractions: store.ghosts.orb.deviceInteractions,
      deviceCommunication: ghostDeviceCommunication.poltergeist.deviceCommunication,
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
      icon: WraithIcon as DefineComponent, 
      favouredRoom: 'den',
      favouredDevice: 'ghostBook',
      active: {
        isActive: store.ghosts.wraith.active.isActive,
        activeRoom: store.ghosts.wraith.active.activeRoom,
        activeDuration: store.ghosts.wraith.active.activeDuration,
        activationStart: store.ghosts.wraith.active.activationStart
      },
      state: store.ghosts.wraith.state,
      deviceInteractions: store.ghosts.wraith.deviceInteractions,
      deviceCommunication: ghostDeviceCommunication.poltergeist.deviceCommunication,
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
      icon: SpiritIcon as DefineComponent, 
      favouredRoom: 'kitchen',
      favouredDevice: 'teaLeaves',
      active: {
        isActive: store.ghosts.spirit.active.isActive,
        activeRoom: store.ghosts.spirit.active.activeRoom,
        activeDuration: store.ghosts.spirit.active.activeDuration,
        activationStart: store.ghosts.spirit.active.activationStart
      },
      state: store.ghosts.spirit.state,
      deviceInteractions: store.ghosts.spirit.deviceInteractions,
      deviceCommunication: ghostDeviceCommunication.poltergeist.deviceCommunication,
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
      icon: PhantomIcon as DefineComponent, 
      favouredRoom: 'bathroom',
      favouredDevice: 'shrine',
      active: {
        isActive: store.ghosts.phantom.active.isActive,
        activeRoom: store.ghosts.phantom.active.activeRoom,
        activeDuration: store.ghosts.phantom.active.activeDuration,
        activationStart: store.ghosts.phantom.active.activationStart
      },
      state: store.ghosts.phantom.state,
      deviceInteractions: store.ghosts.phantom.deviceInteractions,
      deviceCommunication: ghostDeviceCommunication.poltergeist.deviceCommunication,
      description: [
        'Description when encountered. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Description when identified. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Description when communicated. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Description when befriended or banished. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    }
  ]);

  const knownGhosts = computed(() => ghosts.value.filter(ghost => ghost.state !== 'Unknown'));

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

  const getName = (ghost: any) => {
    if (ghost.state === 'Encountered') {
      return '???';
    }
    else {
      return ghost.name.charAt(0).toUpperCase() + ghost.name.slice(1);
    }
  }

  const getType = (ghost: any) => {
    if (ghost.state === 'Encountered') {
      return '???';
    } else {
      return ghost.type.charAt(0).toUpperCase() + ghost.type.slice(1);
    }
  };

  const activateGhost = (ghostKey: GhostKey, duration: number) => {
    const randomRoom = rooms.value[Math.floor(Math.random() * rooms.value.length)];
    console.log(`Activating ${ghostKey} in ${randomRoom.key} for ${duration}ms`);

    store.ghosts[ghostKey].active.isActive = true;
    store.ghosts[ghostKey].active.activeRoom = randomRoom.key;
    store.ghosts[ghostKey].active.activeDuration = duration;
    store.ghosts[ghostKey].active.activationStart = gameNow();

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
      room: randomRoom.key
    });
  };

  const deactivateGhost = (ghostKey: keyof typeof store.ghosts) => {
    store.ghosts[ghostKey].active.isActive = false;
    store.ghosts[ghostKey].active.activeRoom = null;
    store.ghosts[ghostKey].active.activeDuration = null;
    store.ghosts[ghostKey].active.activationStart = null;
  };

  return { activateGhost, deactivateGhost, knownGhosts, getTagColor, getLabel, getName, getType };
};

import { useStore } from './useStore';


export const useGhosts = () => {
  const store = useStore();

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
    const time = new Date().toLocaleTimeString();
    const room = randomRoom;

    store.log.push({
      description,
      time,
      room
    });
  };

  const deactivateGhost = (ghostKey: keyof typeof store.ghosts) => {
    store.ghosts[ghostKey].isActive = false;
    store.ghosts[ghostKey].activeRoom = null;
    store.ghosts[ghostKey].activeDuration = null;
    store.ghosts[ghostKey].activationStart = null;
  };

  return { activateGhost, deactivateGhost };
};

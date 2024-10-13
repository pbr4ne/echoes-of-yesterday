import { useStore } from './useStore';
import { useGhosts } from './useGhosts';
import { emitter } from '../utilities/emitter';

export function startGameLoop() {
  const store = useStore();
  const ghosts = useGhosts();

  const TICK_RATE = 50;
  let lastTick = Date.now();

  const gameLoop = () => {
    const now = Date.now();
    const delta = now - lastTick;

    if (delta >= TICK_RATE) {
      lastTick = now;

      const ghostKeys = Object.keys(store.ghosts) as Array<keyof typeof store.ghosts>;
      const activeGhost = ghostKeys.find(key => store.ghosts[key].isActive === true);

      if (activeGhost) {
        const ghost = store.ghosts[activeGhost];
        if (ghost.activationStart && ghost.activeDuration && now - ghost.activationStart >= ghost.activeDuration) {
          ghosts.deactivateGhost(activeGhost);
        }
      } else {
        const randomGhostKey = ghostKeys[Math.floor(Math.random() * ghostKeys.length)];
        const randomDuration = Math.random() * (15000 - 5000) + 5000;

        ghosts.activateGhost(randomGhostKey, randomDuration);
      }

      store.pendingActions = store.pendingActions.filter(action => {
        const elapsed = now - action.startTime;
        const progress = Math.min((elapsed / action.duration) * 100, 100);
        emitter.emit('actionProgressed', { actionKey: action.actionKey, progress });

        if (progress >= 100) {
          const statKey = action.actionKey as keyof typeof store.stats;
          if (action.actionType === 'increase') {
            store.adjustValue(statKey, 5);
          } else {
            store.adjustValue(statKey, -5);
          }
          emitter.emit('actionCompleted', { actionKey: action.actionKey });
          return false;
        }
        return true;
      });

      Object.keys(store.stats).forEach(statKey => {
        const key = statKey as keyof typeof store.stats;
        const stat = store.stats[key];
        const decayAmount = stat.decayRate * (delta / 1000);
        store.adjustValue(key, decayAmount);
      });
    }

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}

export function stopGameLoop() {
  const store = useStore();
  if (store._gameLoopId !== null) {
    cancelAnimationFrame(store._gameLoopId);
    store._gameLoopId = null;
  }
}

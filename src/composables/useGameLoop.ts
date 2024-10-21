import { useStore } from './useStore';
import { useGhosts } from './useGhosts';
import { emitter } from '../utilities/emitter';
import { ResearchKeys } from '../utilities/types';

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

      store.updateTime(delta);

      const urlSearchParams = new URLSearchParams(window.location.search);

      if (urlSearchParams.get('DISABLE_GHOSTS') !== 'true') {
        activateGhosts(now);
      }

      store.pendingActions = store.pendingActions.filter(action => {
        const elapsed = now - action.startTime;
        const progress = Math.min((elapsed / action.duration) * 100, 100);
        emitter.emit('actionProgressed', { actionKey: action.actionKey, progress });

        if (progress >= 100) {
          const statKey = action.actionKey as keyof typeof store.stats;
          store.adjustValue(statKey, action.amount);
          emitter.emit('actionCompleted', { actionKey: action.actionKey });
          return false;
        }
        return true;
      });

      const processResearchProgress = (researchGroup: any) => {
        Object.keys(researchGroup).forEach(key => {
          const research = researchGroup[key];
          if (research.startTime && research.duration) {
            const elapsed = now - research.startTime;
            const progress = Math.min((elapsed / research.duration) * 100, 100);
            emitter.emit('researchProgressed', { researchKey: key, progress });

            if (progress >= 100) {
              store.completeResearch(key);
              emitter.emit('researchCompleted', { researchKey: key });
            }
          }

          if (research.children) {
            processResearchProgress(research.children);
          }
        });
      };

      Object.keys(store.research2).forEach(researchGroupKey => {
        const researchGroup = store.research2[researchGroupKey as ResearchKeys];
        processResearchProgress(researchGroup);
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

  const activateGhosts = (now: number) => {
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
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}

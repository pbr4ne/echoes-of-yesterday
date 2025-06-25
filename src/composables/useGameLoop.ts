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

      store.pendingOneTimeActions = store.pendingOneTimeActions.filter(action => {
        if (action.startTime === undefined) {
          return false;
        }
        const elapsed = now - action.startTime;
        const progress = Math.min((elapsed / action.duration) * 100, 100);
        emitter.emit('oneTimeActionProgressed', { actionKey: action.actionKey, progress });

        if (progress >= 100) {
          action.affected.forEach(affected => {
            store.adjustValue(affected.key, affected.amount);
          });
          emitter.emit('oneTimeActionCompleted', { actionKey: action.actionKey });
          return false;
        }
        return true;
      });

      store.pendingPersistentActions.forEach(action => {
        action.affected.forEach(affected => {
          store.adjustValue(affected.key, affected.amountPerSecond * (delta / 1000));
        });
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

      Object.keys(store.research).forEach(researchGroupKey => {
        const researchGroup = store.research[researchGroupKey as ResearchKeys];
        processResearchProgress(researchGroup);
      });

      if (urlSearchParams.get('DISABLE_DECAY') !== 'true') {
        Object.keys(store.stats).forEach(statKey => {
          const key = statKey as keyof typeof store.stats;
          const stat = store.stats[key];
          const decayAmount = stat.decayRate * (delta / 1000);
          store.adjustValue(key, decayAmount);
        });
      }
    }

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  const activateGhosts = (now: number) => {
    const ghostKeys = Object.keys(store.ghosts) as Array<keyof typeof store.ghosts>;
    const activeGhost = ghostKeys.find(key => store.ghosts[key].active.isActive === true);

    if (activeGhost) {
      const ghost = store.ghosts[activeGhost];
      if (ghost.active.activationStart && ghost.active.activeDuration && now - ghost.active.activationStart >= ghost.active.activeDuration) {
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

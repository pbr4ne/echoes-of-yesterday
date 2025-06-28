import { useStore } from './useStore';
import { useGhosts } from './useGhosts';
import { useTime } from './useTime';
import { emitter } from '../utilities/emitter';

export function startGameLoop() {
  const store = useStore();
  const ghosts = useGhosts();
  const { paused, gameNow } = useTime();

  const TICK_RATE = 50;
  let lastRealNow = Date.now();

  const normaliseStart = (start: number, now: number): number =>
    start > now ? now : start;

  const handleGhosts = (now: number): void => {
    const keys = Object.keys(store.ghosts) as (keyof typeof store.ghosts)[];
    const activeKey = keys.find(k => store.ghosts[k].active.isActive);

    if (activeKey) {
      const g = store.ghosts[activeKey];
      if (g.active.activationStart &&
          g.active.activeDuration &&
          now - g.active.activationStart >= g.active.activeDuration) {
        ghosts.deactivateGhost(activeKey);
      }
    } else {
      const k = keys[Math.floor(Math.random() * keys.length)];
      const d = 5000 + Math.random() * 10000;
      ghosts.activateGhost(k, d);
    }
  };

  const updateResearch = (node: any, now: number): void => {
    Object.entries(node).forEach(([key, r]: [string, any]) => {
      if (r.startTime && r.duration) {
        r.startTime = normaliseStart(r.startTime, now);
        const prog = Math.min(((now - r.startTime) / r.duration) * 100, 100);
        emitter.emit('researchProgressed', { researchKey: key, progress: prog });
        if (prog >= 100) {
          store.completeResearch(key);
          emitter.emit('researchCompleted', { researchKey: key });
        }
      }
      if (r.children) {
        updateResearch(r.children, now);
      }
    });
  };

  const gameLoop = (): void => {
    if (paused.value) {
      store._gameLoopId = requestAnimationFrame(gameLoop);
      return;
    }

    const realNow = Date.now();
    const realDelta = realNow - lastRealNow;
    if (realDelta < TICK_RATE) {
      store._gameLoopId = requestAnimationFrame(gameLoop);
      return;
    }
    lastRealNow = realNow;

    store.updateTime(realDelta);

    const now = gameNow();

    const url = new URLSearchParams(window.location.search);
    if (url.get('DISABLE_GHOSTS') !== 'true') {
      handleGhosts(now);
    }

    store.pendingOneTimeActions = store.pendingOneTimeActions.filter(a => {
      if (!a.startTime) {
        return false;
      }
      a.startTime = normaliseStart(a.startTime, now);
      const prog  = Math.min(((now - a.startTime) / a.duration) * 100, 100);
      emitter.emit('oneTimeActionProgressed', { actionKey: a.actionKey, progress: prog });

      if (prog < 100) {
        return true;
      }

      a.affected.forEach(x => store.adjustValue(x.key, x.amount));
      if (a.deviceKey && a.targetGhost) {
        const g = store.ghosts[a.targetGhost];
        g.deviceInteractions[a.deviceKey] = (g.deviceInteractions[a.deviceKey] ?? 0) + 1;
        emitter.emit('deviceInteractedWith', { deviceKey: a.deviceKey, targetGhost: a.targetGhost });
      }
      emitter.emit('oneTimeActionCompleted', { actionKey: a.actionKey });
      return false;
    });

    store.pendingPersistentActions.forEach(a =>
      a.affected.forEach(x =>
        store.adjustValue(x.key, x.amountPerSecond * (realDelta / 1000))
      )
    );

    Object.values(store.research).forEach(rg => updateResearch(rg, now));

    if (url.get('DISABLE_DECAY') !== 'true') {
      Object.entries(store.stats).forEach(([k, s]) =>
        store.adjustValue(k as any, s.decayRate * (realDelta / 1000))
      );
    }

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}

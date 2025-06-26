import { onUnmounted } from 'vue';
import { useModal } from 'naive-ui';
import { emitter } from '../utilities/emitter';
import { DeviceKey, GhostKey } from '../utilities/types';
import { useDevices } from './useDevices';
import { useStore } from './useStore';

export const useDeviceCommunication = () => {
	const modal = useModal();
  const devices = useDevices();
  const store = useStore();

  const showDialogs = (intro: string, messages: string[]) => {
    const open = (i: number) => {
      modal.create({
				title: 'Device interaction',
				preset: 'dialog',
				content: i === 0 ? `${intro}\n\n${messages[i]}` : messages[i],
				positiveText: i < messages.length - 1 ? 'Next' : 'OK',
				onPositiveClick: () => {
					if (i < messages.length - 1) open(i + 1)
				}
			})
		}
		open(0)
	};

  const handleInteraction = ({ deviceKey, targetGhost }: { deviceKey?: string; targetGhost?: string }) => {
    if (!deviceKey || !targetGhost) return;

    const dKey = deviceKey as DeviceKey;
    const gKey = targetGhost as GhostKey;

    const interactions = devices.devices[gKey].deviceCommunication[dKey];
    const idx = Math.min(store.ghosts[gKey].deviceInteractions[dKey] - 1, interactions.length - 1);

    const intro = `used ${dKey} to communicate with ${gKey}. numTimes: ${idx + 1}.`;
    const messages = interactions[idx];

    showDialogs(intro, messages);
	}

	emitter.on('deviceInteractedWith', handleInteraction);

	onUnmounted(() => {
		emitter.off('deviceInteractedWith', handleInteraction);
	})
}

import { onUnmounted } from 'vue'
import { useModal } from 'naive-ui'
import { emitter } from '../utilities/emitter'
import { DeviceKey, GhostKey } from '../utilities/types'

export const useDeviceCommunication = () => {
	const modal = useModal()

	const handleInteraction = (e: { deviceKey?: string; targetGhost?: string }) => {
		if (!e.deviceKey || !e.targetGhost) return

		const deviceKey = e.deviceKey as DeviceKey
		const targetGhost = e.targetGhost as GhostKey

    modal.create({
			title: 'Device interaction',
      preset: 'dialog',
			content: `used ${deviceKey} to communicate with ${targetGhost}.`
		})
	}

	emitter.on('deviceInteractedWith', handleInteraction)

	onUnmounted(() => {
		emitter.off('deviceInteractedWith', handleInteraction)
	})
}

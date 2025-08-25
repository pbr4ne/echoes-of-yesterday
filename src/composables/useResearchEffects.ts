import { DeviceKey, RoomKey, StatKey } from '../utilities/types';
import { ResearchEffect } from '../utilities/types';

export const researchEffects: Record<string, ResearchEffect[]> = {
	paranormal1: [
		{ type: 'unlock_device', device: 'teaLeaves' as DeviceKey }
	],
	paranormal2: [
		{ type: 'unlock_device', device: 'tv' as DeviceKey }
	],
	sustenance1: [
		{ type: 'stat_decay_multiplier', stat: 'hunger' as StatKey, multiplier: 0.95 }
	],
};

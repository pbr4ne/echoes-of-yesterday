import { DeviceKey, RoomKey, ResearchKeys, StatKey } from '../utilities/types';
import { ResearchEffect } from '../utilities/types';

export const researchEffects: Record<string, ResearchEffect[]> = {
	paranormal1: [
		{ type: 'unlock_device', device: 'ouijaBoard' as DeviceKey },
    { type: 'unlock_research', key: 'paranormal2' as ResearchKeys }
	],
	paranormal2: [
		{ type: 'unlock_device', device: 'tv' as DeviceKey },
    { type: 'unlock_research', key: 'paranormal3' as ResearchKeys }
	],
	sustenance1: [
		{ type: 'stat_decay_multiplier', stat: 'hunger' as StatKey, multiplier: 0.95 }
	],
};

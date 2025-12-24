import { DeviceKey, RoomKey, ResearchKeys, StatKey } from '../utilities/types';
import { ResearchEffect } from '../utilities/types';

export const researchEffects: Record<string, ResearchEffect[]> = {
  // paranormal1: [
  //   { type: 'unlock_device', device: 'ouijaBoard' as DeviceKey },
  //   { type: 'unlock_research', key: 'paranormal2' as ResearchKeys }
  // ],
  //   sustenance1: [
  //   { type: 'stat_decay_multiplier', stat: 'hunger' as StatKey, multiplier: 0.95 }
  // ],

  //sustenance
  herbalism: [{ type: 'unlock_research', key: 'catFood' as ResearchKeys }, { type: 'unlock_research', key: 'kitchenEfficiency' as ResearchKeys }],
  catFood: [{ type: 'unlock_research', key: 'fruit' as ResearchKeys }],
  fruit: [{ type: 'unlock_research', key: 'hungerCues' as ResearchKeys }],
  hungerCues: [],
  kitchenEfficiency: [{ type: 'unlock_research', key: 'grains' as ResearchKeys }],
  grains: [{ type: 'unlock_research', key: 'satiety' as ResearchKeys }],
  satiety: [],

  //fitness
  calisthenics: [{ type: 'unlock_research', key: 'catnip' as ResearchKeys }],
  catnip: [{ type: 'unlock_research', key: 'kinesiology' as ResearchKeys }, { type: 'unlock_research', key: 'weights' as ResearchKeys }],
  kinesiology: [{ type: 'unlock_research', key: 'mobility' as ResearchKeys }],
  mobility: [],
  weights: [{ type: 'unlock_research', key: 'sprinting' as ResearchKeys }],
  sprinting: [],

  //recreation
  puzzles: [{ type: 'unlock_research', key: 'fun' as ResearchKeys }],
  fun: [],
  catTricks: [{ type: 'unlock_research', key: 'entertainmentTBD' as ResearchKeys }],
  entertainmentTBD: [{ type: 'unlock_research', key: 'lateralThinking' as ResearchKeys }],
  lateralThinking: [{ type: 'unlock_research', key: 'daydreaming' as ResearchKeys }],
  daydreaming: [],

  //rest
  sleepHygiene: [{ type: 'unlock_research', key: 'catNapping' as ResearchKeys }],
  catNapping: [{ type: 'unlock_research', key: 'lucidDreams' as ResearchKeys }],
  lucidDreams: [{ type: 'unlock_research', key: 'deepRest' as ResearchKeys }, { type: 'unlock_research', key: 'sheepTechnique' as ResearchKeys }],
  deepRest: [],
  sheepTechnique: [],

  //paranormal
  smudging: [{ type: 'unlock_research', key: 'divination' as ResearchKeys }, { type: 'unlock_research', key: 'parapsychology' as ResearchKeys }],
  divination: [{ type: 'unlock_research', key: 'aeromancy' as ResearchKeys }],
  aeromancy: [{ type: 'unlock_research', key: 'cartomancy' as ResearchKeys }, { type: 'unlock_device', device: 'windChimes' as DeviceKey }],
  cartomancy: [{ type: 'unlock_research', key: 'tasseomancy' as ResearchKeys }, { type: 'unlock_research', key: 'capnomancy' as ResearchKeys }, { type: 'unlock_device', device: 'tarot' as DeviceKey }],
  tasseomancy: [{ type: 'unlock_research', key: 'iconomancy' as ResearchKeys }, { type: 'unlock_research', key: 'seance' as ResearchKeys }, { type: 'unlock_device', device: 'teapot' as DeviceKey }],
  iconomancy: [{ type: 'unlock_device', device: 'tv' as DeviceKey }],
  seance: [{ type: 'unlock_device', device: 'ouijaBoard' as DeviceKey }],
  capnomancy: [{ type: 'unlock_research', key: 'pyromancy' as ResearchKeys }, { type: 'unlock_device', device: 'shrine' as DeviceKey }],
  pyromancy: [{ type: 'unlock_device', device: 'candles' as DeviceKey }],
  parapsychology: [{ type: 'unlock_research', key: 'spiritBox' as ResearchKeys }],
  spiritBox: [{ type: 'unlock_research', key: 'scrying' as ResearchKeys }, { type: 'unlock_research', key: 'entheogens' as ResearchKeys }, { type: 'unlock_device', device: 'radio' as DeviceKey }],
  scrying: [{ type: 'unlock_research', key: 'spectroscopy' as ResearchKeys }, { type: 'unlock_device', device: 'mirror' as DeviceKey }],
  spectroscopy: [{ type: 'unlock_research', key: 'astralProjection' as ResearchKeys }, { type: 'unlock_device', device: 'blackLight' as DeviceKey }],
  astralProjection: [{ type: 'unlock_device', device: 'bed' as DeviceKey }],
  entheogens: [{ type: 'unlock_research', key: 'automaticWriting' as ResearchKeys }, { type: 'unlock_device', device: 'mushrooms' as DeviceKey }],
  automaticWriting: [{ type: 'unlock_research', key: 'hermetechnics' as ResearchKeys }, { type: 'unlock_device', device: 'journal' as DeviceKey }],
  hermetechnics: [{ type: 'unlock_device', device: 'computer' as DeviceKey }],
};

import { computed, DefineComponent } from 'vue';
import { useStore } from './useStore';
import { RoomDisplay, RoomKey, ActionGroup } from '../utilities/types';
import LivingRoomIcon from '@vicons/tabler/Lamp';
import KitchenIcon from '@vicons/material/KitchenOutlined';
import BedroomIcon from '@vicons/ionicons5/BedOutline';
import SunroomIcon from '@vicons/tabler/Plant';
import BathroomIcon from '@vicons/tabler/Bath';
import DenIcon from '@vicons/ionicons5/BookOutline';
import CellarIcon from '@vicons/fluent/ConferenceRoom24Regular';

export const useRooms = () => {

  const store = useStore();

  const livingRoomActions: ActionGroup[] = [
    {
      title: 'Television',
      actions: [
        { actionKey: 'watchTV', label: 'Watch TV', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'doTaebo', label: 'Do Taebo', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
        { actionKey: 'stareAtStatic', label: 'Stare At Static', duration: 10000, deviceKey: 'tv', affected: [] },
      ],
    },
    {
      title: 'Chesterfield',
      actions: [
        { actionKey: 'doze', label: 'Doze', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
        { actionKey: 'readMagazine', label: 'Read Magazine', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      ],
    },
    {
      title: 'Fireplace',
      actions: [
        { actionKey: 'stokeFire', label: 'Stoke Fire', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
        { actionKey: 'studyFlames', label: 'Study Flames', duration: 10000, deviceKey: 'candles', affected: [] },
      ],
    },
  ];

  const bathroomActions: ActionGroup[] = [
    {
      title: 'Bathtub',
      actions: [
        { actionKey: 'bathe', label: 'Bathe', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
        { actionKey: 'readBook', label: 'Read Book', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'shrine', label: 'Shrine', duration: 10000, deviceKey: 'shrine', affected: [] },
      ],
    },
    {
      title: 'Vanity',
      actions: [
        { actionKey: 'readSigils', label: 'Read Mirror Sigils', duration: 10000, deviceKey: 'mirror', affected: [] },
      ],
    },
  ];

  const kitchenActions: ActionGroup[] = [
    {
      title: 'Stove',
      actions: [
        { actionKey: 'eatSoup', label: 'Make Soup', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
        { actionKey: 'eatStew', label: 'Prepare Stew', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
        { actionKey: 'eatHash', label: 'Sauté Hash', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
        //{ actionKey: 'persistentCook', label: 'Persistent Cook', affected: [{ key: 'fatigue', amountPerSecond: -1 }] },
      ],
    },
    {
      title: 'Radio',
      actions: [
        { actionKey: 'listenToMusic', label: 'Listen to Music', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'listenToVoices', label: 'Listen to Voices', duration: 10000, deviceKey: 'radio', affected: [] },
      ],
    },
    {
      title: 'Counter',
      actions: [
        { actionKey: 'eatSalad', label: 'Mix Salad', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
        { actionKey: 'eatPorridge', label: 'Stir Porridge', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
        { actionKey: 'eatBread', label: 'Bake Bread', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
      ],
    },
    {
      title: 'Tea Kettle',
      actions: [
        { actionKey: 'blackTea', label: 'Steep Black Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }, { key: 'fatigue', amount: -10 }] },
        { actionKey: 'herbalTea', label: 'Infuse Herbal Tea', duration: 10000, affected: [{ key: 'hunger', amount: -10 }] },
        { actionKey: 'readTeaLeaves', label: 'Read Tea Leaves', duration: 10000, deviceKey: 'teaKettle', affected: [] },
      ],
    },
  ];

  const bedroomActions: ActionGroup[] = [
    {
      title: 'Bed',
      actions: [
        { actionKey: 'nap', label: 'Nap', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
        { actionKey: 'sleep', label: 'Sleep', duration: 10000, affected: [{ key: 'fatigue', amount: -10 }] },
        { actionKey: 'read', label: 'Read', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
      ],
    },
    {
      title: 'Room',
      actions: [
        { actionKey: 'useBlackLight', label: 'Use Black Light', duration: 10000, deviceKey: 'blackLight', affected: [] },
        { actionKey: 'lightCandles', label: 'Light Candles', duration: 10000, deviceKey: 'candles', affected: [] },
        { actionKey: 'doCalisthenics', label: 'Do Calisthenics', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
      ],
    },
  ];

  const denActions: ActionGroup[] = [
    {
      title: 'Bookshelf',
      actions: [
        { actionKey: 'readNovel', label: 'Read Novel', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'solvePuzzleBook', label: 'Solve Puzzle Book', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'lookAtGhostBook', label: 'Look at Ghost Book', duration: 10000, deviceKey: 'journal', affected: [] },
      ],
    },
    {
      title: 'Computer',
      actions: [
        { actionKey: 'readForums', label: 'Read Forums', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'playSolitaire', label: 'Play Solitaire', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'playComputerGame', label: 'Play Computer Game', duration: 10000, deviceKey: 'computer', affected: [] },
      ],
    },
  ];

  const cellarActions: ActionGroup[] = [
    {
      title: 'Corner',
      actions: [
        { actionKey: 'liftWeights', label: 'Lift Weights', duration: 10000, affected: [{ key: 'frailty', amount: -10 }] },
        { actionKey: 'eatMushrooms', label: 'Eat Mushrooms', duration: 10000, deviceKey: 'mushrooms', affected: [] },
      ],
    },
    {
      title: 'Shelves',
      actions: [
        { actionKey: 'sortBoxes', label: 'Sort Boxes', duration: 10000, affected: [{ key: 'boredom', amount: -10 }, { key: 'frailty', amount: -10 }] },
        { actionKey: 'useOuijaBoard', label: 'Use Ouija Board', duration: 10000, deviceKey: 'ouijaBoard', affected: [] },
      ],
    },
  ];

  const sunroomActions: ActionGroup[] = [
    {
      title: 'Garden Beds',
      actions: [
        { actionKey: 'gatherVegetables', label: 'Harvest Vegetables', duration: 10000, affected: [{ key: 'vegetable', amount: 1 }] },
        { actionKey: 'gatherFruit', label: 'Pick Fruit', duration: 10000, affected: [{ key: 'fruit', amount: 1 }] },
        { actionKey: 'gatherGrain', label: 'Reap Grain', duration: 10000, affected: [{ key: 'grain', amount: 1 }] },
      ],
    },
    {
      title: 'Hanging Pots',
      actions: [
        { actionKey: 'gatherHerbs', label: 'Pluck Herbs', duration: 10000, affected: [{ key: 'herb', amount: 1 }] },
        { actionKey: 'gatherTea', label: 'Gather Tea Leaves', duration: 10000, affected: [{ key: 'tea', amount: 1 }] },
      ],
    },
    {
      title: 'Window Box',
      actions: [
        { actionKey: 'tendToFlowers', label: 'Tend to Flowers', duration: 10000, affected: [{ key: 'boredom', amount: -10 }] },
        { actionKey: 'listenToWindChimes', label: 'Listen to Wind Chimes', duration: 10000, deviceKey: 'windChimes', affected: [] },
        { actionKey: 'readTarot', label: 'Read Tarot Cards', duration: 10000, deviceKey: 'tarot', affected: [] },
      ],
    },
    {
      title: 'Drying Rack',
      actions: [
        { actionKey: 'dryHerbs', label: 'Dry Herbs', duration: 10000, affected: [{ key: 'herb', amount: -1 }, { key: 'driedHerb', amount: 1 }] },
        { actionKey: 'dryTea', label: 'Dry Tea Leaves', duration: 10000, affected: [{ key: 'tea', amount: -1 }, { key: 'driedTea', amount: 1 }] },
      ],
    },
  ];

  const rooms = computed<RoomDisplay[]>(() => [
    { 
      key: 'living', 
      label: 'Living Room', 
      icon: LivingRoomIcon as DefineComponent,
      known: store.rooms.living.known,
      locked: store.rooms.living.locked,
      actionGroups: livingRoomActions,
    },
    { 
      key: 'kitchen', 
      label: 'Kitchen', 
      icon: KitchenIcon as DefineComponent,
      known: store.rooms.kitchen.known,
      locked: store.rooms.kitchen.locked,
      actionGroups: kitchenActions,
    },
    { 
      key: 'bedroom', 
      label: 'Bedroom', 
      icon: BedroomIcon as DefineComponent,
      known: store.rooms.bedroom.known,
      locked: store.rooms.bedroom.locked,
      actionGroups: bedroomActions,
    },
    { 
      key: 'sunroom', 
      label: 'Sunroom', 
      icon: SunroomIcon as DefineComponent,
      known: store.rooms.sunroom.known,
      locked: store.rooms.sunroom.locked,
      actionGroups: sunroomActions,
    },
    { 
      key: 'bathroom', 
      label: 'Bathroom', 
      icon: BathroomIcon as DefineComponent,
      known: store.rooms.bathroom.known,
      locked: store.rooms.bathroom.locked,
      actionGroups: bathroomActions,
    },
    { 
      key: 'den', 
      label: 'Den', 
      icon: DenIcon as DefineComponent,
      known: store.rooms.den.known,
      locked: store.rooms.den.locked,
      actionGroups: denActions,
    },
    { 
      key: 'cellar', 
      label: 'Cellar', 
      icon: CellarIcon as DefineComponent,
      known: store.rooms.cellar.known,
      locked: store.rooms.cellar.locked,
      actionGroups: cellarActions,
    }
  ]);

  const knownRooms = computed(() => rooms.value.filter(room => room.known));

  const getIconForRoom = (roomKey: RoomKey) => {
    const room = rooms.value.find(room => room.key === roomKey);
    return room ? room.icon : null;
  }

  return { knownRooms, rooms, getIconForRoom };
}

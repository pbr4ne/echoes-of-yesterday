import { computed, defineAsyncComponent, DefineComponent } from 'vue';
import { useStore } from './useStore';
import { RoomDisplay, RoomKey } from '../utilities/types';
import LivingRoomIcon from '@vicons/tabler/Lamp';
import KitchenIcon from '@vicons/material/KitchenOutlined';
import BedroomIcon from '@vicons/ionicons5/BedOutline';
import SunroomIcon from '@vicons/tabler/Plant';
import BathroomIcon from '@vicons/tabler/Bath';
import DenIcon from '@vicons/ionicons5/BookOutline';
import CrawlspaceIcon from '@vicons/fluent/ConferenceRoom24Regular';

export const useRooms = () => {

  const store = useStore();

  const LivingRoom = defineAsyncComponent(() => import('../components/rooms/LivingRoom.vue'));
  const Kitchen = defineAsyncComponent(() => import('../components/rooms/Kitchen.vue'));
  const Bedroom = defineAsyncComponent(() => import('../components/rooms/Bedroom.vue'));
  const Sunroom = defineAsyncComponent(() => import('../components/rooms/Sunroom.vue'));
  const Bathroom = defineAsyncComponent(() => import('../components/rooms/Bathroom.vue'));
  const Den = defineAsyncComponent(() => import('../components/rooms/Den.vue'));
  const Cellar = defineAsyncComponent(() => import('../components/rooms/Cellar.vue'));

  const rooms = computed<RoomDisplay[]>(() => [
    { 
      key: 'living', 
      label: 'Living Room', 
      component: LivingRoom as DefineComponent, 
      icon: LivingRoomIcon as DefineComponent,
      known: store.rooms.living.known,
      locked: store.rooms.living.locked,
    },
    { 
      key: 'kitchen', 
      label: 'Kitchen', 
      component: Kitchen as DefineComponent, 
      icon: KitchenIcon as DefineComponent,
      known: store.rooms.kitchen.known,
      locked: store.rooms.kitchen.locked,
    },
    { 
      key: 'bedroom', 
      label: 'Bedroom', 
      component: Bedroom as DefineComponent, 
      icon: BedroomIcon as DefineComponent,
      known: store.rooms.bedroom.known,
      locked: store.rooms.bedroom.locked,
    },
    { 
      key: 'sunroom', 
      label: 'Sunroom', 
      component: Sunroom as DefineComponent, 
      icon: SunroomIcon as DefineComponent,
      known: store.rooms.sunroom.known,
      locked: store.rooms.sunroom.locked,
    },
    { 
      key: 'bathroom', 
      label: 'Bathroom', 
      component: Bathroom as DefineComponent, 
      icon: BathroomIcon as DefineComponent,
      known: store.rooms.bathroom.known,
      locked: store.rooms.bathroom.locked,
    },
    { 
      key: 'den', 
      label: 'Den', 
      component: Den as DefineComponent, 
      icon: DenIcon as DefineComponent,
      known: store.rooms.den.known,
      locked: store.rooms.den.locked,
    },
    { 
      key: 'crawlspace', 
      label: 'Crawlspace', 
      component: Cellar as DefineComponent, 
      icon: CrawlspaceIcon as DefineComponent,
      known: store.rooms.crawlspace.known,
      locked: store.rooms.crawlspace.locked,
    }
  ]);

  const knownRooms = computed(() => rooms.value.filter(room => room.known));

  const getIconForRoom = (roomKey: RoomKey) => {
    const room = rooms.value.find(room => room.key === roomKey);
    return room ? room.icon : null;
  }

  return { knownRooms, rooms, getIconForRoom };
}

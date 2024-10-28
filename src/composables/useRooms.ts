import { defineAsyncComponent, ref, shallowRef } from 'vue';
import LivingRoomIcon from '@vicons/tabler/Lamp';
import KitchenIcon from '@vicons/material/KitchenOutlined';
import BedroomIcon from '@vicons/ionicons5/BedOutline';
import SunroomIcon from '@vicons/tabler/Plant';
import BathroomIcon from '@vicons/tabler/Bath';
import DenIcon from '@vicons/ionicons5/BookOutline';
import CrawlspaceIcon from '@vicons/fluent/ConferenceRoom24Regular';

export const useRooms = () => {

  const LivingRoom = defineAsyncComponent(() => import('../components/rooms/LivingRoom.vue'));
  const Kitchen = defineAsyncComponent(() => import('../components/rooms/Kitchen.vue'));
  const Bedroom = defineAsyncComponent(() => import('../components/rooms/Bedroom.vue'));
  const Sunroom = defineAsyncComponent(() => import('../components/rooms/Sunroom.vue'));
  const Bathroom = defineAsyncComponent(() => import('../components/rooms/Bathroom.vue'));
  const Den = defineAsyncComponent(() => import('../components/rooms/Den.vue'));
  const Cellar = defineAsyncComponent(() => import('../components/rooms/Cellar.vue'));

  const rooms = ref([
    { name: 'Living Room', label: 'Living Room', component: shallowRef(LivingRoom), icon: LivingRoomIcon },
    { name: 'Kitchen', label: 'Kitchen', component: shallowRef(Kitchen), icon: KitchenIcon },
    { name: 'Bedroom', label: 'Bedroom', component: shallowRef(Bedroom), icon: BedroomIcon },
    { name: 'Sunroom', label: 'Sunroom', component: shallowRef(Sunroom), icon: SunroomIcon },
    { name: 'Bathroom', label: 'Bathroom', component: shallowRef(Bathroom), icon: BathroomIcon },
    { name: 'Den', label: 'Den', component: shallowRef(Den), icon: DenIcon },
    { name: 'Cellar', label: 'Crawlspace', component: shallowRef(Cellar), icon: CrawlspaceIcon }
  ]);

  const getIconForRoom = (roomName: string) => {
    const room = rooms.value.find(room => room.name === roomName);
    return room ? room.icon : null;
  }

  return { rooms, getIconForRoom };
}
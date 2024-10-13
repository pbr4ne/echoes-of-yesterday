import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { piniaPlugin } from './utilities/piniaPlugin';
import { useStore } from './composables/useStore';
import { startGameLoop } from './composables/useGameLoop'; 
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';

import { 
  create,
  NButton, 
  NCard, 
  NConfigProvider,
  NDivider,
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
  NNotificationProvider,
  NProgress,
  NScrollbar,
  NSpace,
  NTabs,
  NTabPane,
  NTag,
  NTimeline,
  NTimelineItem,
  NTree,
} from 'naive-ui';


const naive = create({
  components: [
    NButton, 
    NCard, 
    NConfigProvider,
    NDivider,
    NFlex,
    NGrid,
    NGridItem,
    NIcon,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NNotificationProvider,
    NProgress,
    NSpace,
    NScrollbar,
    NTabs,
    NTabPane,
    NTag,
    NTimeline,
    NTimelineItem,
    NTree,
  ],
});

let defaultoptions = {nodeName: 'default-node', treeName: 'blocks-tree'}

const pinia = createPinia();
pinia.use(piniaPlugin);

const app = createApp(App);
app.use(naive);
app.use(pinia);
app.use(VueBlocksTree, defaultoptions);

const store = useStore();
store.listenForEvents();

startGameLoop();

app.mount('#app');
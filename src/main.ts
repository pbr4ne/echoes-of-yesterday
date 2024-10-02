import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { piniaPlugin } from './utilities/piniaPlugin';

import { 
  create,
  NButton, 
  NCard, 
  NConfigProvider,
  NDivider,
  NFlex,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
  NNotificationProvider,
  NProgress,
  NTabs,
  NTabPane,
  NTimeline,
  NTimelineItem,
  NSpace,
} from 'naive-ui';


const naive = create({
  components: [
    NButton, 
    NCard, 
    NConfigProvider,
    NDivider,
    NFlex,
    NIcon,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NNotificationProvider,
    NProgress,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
    NSpace,
  ],
});

const pinia = createPinia();
pinia.use(piniaPlugin);

const app = createApp(App);
app.use(naive);
app.use(pinia);
app.mount('#app');
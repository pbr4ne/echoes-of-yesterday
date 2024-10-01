import { createApp } from 'vue';
import App from './App.vue';
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

const app = createApp(App);
app.use(naive);
app.mount('#app');
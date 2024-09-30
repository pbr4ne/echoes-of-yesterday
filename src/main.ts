import { createApp } from 'vue';
import App from './App.vue';
import { 
  create,
  NButton, 
  NCard, 
  NConfigProvider,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
  NNotificationProvider,
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
    NIcon,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NNotificationProvider,
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
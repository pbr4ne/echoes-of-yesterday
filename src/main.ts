import { createApp } from 'vue';
import App from './App.vue';
import Game from './components/Game.vue'
import { 
  create,
  NButton, 
  NCard, 
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NNotificationProvider,
  NTabs,
  NTabPane,
} from 'naive-ui';

const naive = create({
  components: [
    App,
    Game,
    NButton, 
    NCard, 
    NConfigProvider,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NNotificationProvider,
    NTabs,
    NTabPane,
  ],
});

const app = createApp(App);
app.use(naive);
app.mount('#app');
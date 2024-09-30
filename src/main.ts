import { createApp } from 'vue';
import App from './App.vue';
import { 
  create,
  NButton, 
  NCard, 
  NConfigProvider, 
  NTabs,
  NTabPane,
} from 'naive-ui';

const naive = create({
  components: [
    NButton, 
    NCard, 
    NConfigProvider,
    NTabs,
    NTabPane,
  ],
});

const app = createApp(App);
app.use(naive);
app.mount('#app');
import { createApp } from 'vue';
import App from './App.vue';
import { create, NButton, NConfigProvider, darkTheme } from 'naive-ui';

const naive = create({
  components: [NButton, NConfigProvider],
});

const app = createApp(App);
app.use(naive);
app.mount('#app');
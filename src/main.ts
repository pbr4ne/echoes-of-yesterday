import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { piniaPlugin } from './utilities/piniaPlugin';
import { naive } from './utilities/naiveUI';
import { useStore } from './composables/useStore';
import { startGameLoop } from './composables/useGameLoop'; 
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';

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
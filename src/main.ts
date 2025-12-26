import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { piniaPlugin } from './utilities/piniaPlugin';
import { naive } from './utilities/naiveUI';
import { useStore } from './composables/useStore';
import { startGameLoop } from './composables/useGameLoop'; 
import { useTime } from './composables/useTime';
import { emitter } from './utilities/emitter';
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
import './styles/animations.css';

let defaultoptions = {nodeName: 'default-node', treeName: 'blocks-tree'}

const pinia = createPinia();
pinia.use(piniaPlugin);

const app = createApp(App);
app.use(naive);
app.use(pinia);
app.use(VueBlocksTree, defaultoptions);

const store = useStore();

const url = new URLSearchParams(window.location.search);
if (url.get('UNLOCK_ALL') === 'true') {
  store.unlockAll();
}

store.listenForEvents();

const { pause, resume } = useTime();
emitter.on('paused', pause);
emitter.on('unpaused', resume);

startGameLoop();

app.mount('#app');
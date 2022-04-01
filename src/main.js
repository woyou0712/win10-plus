import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import NewDreamPlus from "@/new-dream-plus/index.js";




createApp(App).use(store).use(router).use(NewDreamPlus).mount('#app');




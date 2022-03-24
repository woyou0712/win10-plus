import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import NewDreamPlus from "@/new-dream-plus/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'




createApp(App).use(store).use(router).use(ElementPlus).use(NewDreamPlus).mount('#app');




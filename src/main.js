import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './core/router/index.js'
import { useAuthStore } from './core/stores/AuthStore.js'

const pinia = createPinia();
const app = createApp(App);


app.use(pinia);

app.use(router);
const authControl = useAuthStore();
authControl.loadUser();

app.mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import store2 from './store2';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(store2);
app.mount('#app');




/*
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

*/

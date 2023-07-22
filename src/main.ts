import './assets/main.css'
import './assets/reset.css'
import './assets/global-variables.css'

import { createApp } from 'vue'
import App from './App.vue'
import City from './views/City.vue'
import HomePage from './views/HomePage.vue'
import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import { createPinia } from 'pinia'

const routes: RouteRecordRaw[] = [
  { name: "Home", path: "/", component: HomePage },
  { name: "City", path: "/city", component: City },
  { name: "Home", path: "/:pathMatch(.*)*", component: HomePage },
];

const pinia = createPinia()

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

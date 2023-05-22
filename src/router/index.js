import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Exercise1 from '../views/Exercise1.vue';
import Exercise2 from '../views/Exercise2.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ejercicio1',
    name: 'Ejercicio1',
    component: Exercise1
  },
  {
    path: '/ejercicio2',
    name: 'Ejercicio2',
    component: Exercise2
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
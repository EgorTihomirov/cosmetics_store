import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/TheHome.vue'
import Catalog from '../views/TheCatalog.vue'
import About from '../views/TheAbout.vue'
import Like from '../views/TheLike.vue'
import Shopping from '../views/ShoppingCart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/like',
    name: 'Like',
    component: Like
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: Shopping
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
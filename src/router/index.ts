import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/TheHome.vue'
import Catalog from '../views/TheCatalog.vue'
import About from '../views/TheAbout.vue'
import Favorites from '../views/TheFavorites.vue'
import Cart from '../views/TheCart.vue'
import ProductDetails from '../views/ProductDetails.vue'
import User from '../views/TheUser.vue'
import Quest from '../views/TheQuestions.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/questions',
    name: 'quest',
    component: Quest,
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
    props: true
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: true
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: Favorites,
    props: true
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TheHome from '../views/TheHome.vue'
import TheCatalog from '../views/TheCatalog.vue'
import TheAbout from '../views/TheAbout.vue'
import TheFavorites from '../views/TheFavorites.vue'
import TheCart from '../views/TheCart.vue'
import ProductDetails from '../views/ProductDetails.vue'
import TheUser from '../views/TheUser.vue'
import TheQuestions from '../views/TheQuestions.vue'
import TheHotline from '../views/TheHotline.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import AuthComponent from '../views/AuthComponent.vue'
import SiteMap from '../views/SiteMap.vue'
import OfferView from '../views/OfferView.vue'
import Defence from '../views/TheDefence.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/cosmetics_store/auth',
    name: 'Auth',
    component: AuthComponent,
    props: true
  },
  {
    path: '/cosmetics_store/def',
    name: "Def",
    component: Defence,
    props: true
  },
  {
    path: '/cosmetics_store/log',
    name: 'Login',
    component: LoginView,
    props: true
  },
  {
    path: '/cosmetics_store/reg',
    name: 'Registration',
    component: RegistrationView,
    props: true
  },
  {
    path: '/cosmetics_store/account',
    name: 'Account',
    component: TheUser,
    props: true
  },
  {
    path: '/cosmetics_store/',
    name: 'Home',
    component: TheHome,
    props: true
  },
  {
    path: '/cosmetics_store/catalog',
    name: 'Catalog',
    component: TheCatalog,
    props: true
  },
  {
    path: '/cosmetics_store/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/cosmetics_store/about',
    name: 'About',
    component: TheAbout,
    props: true
  },
  {
    path: '/cosmetics_store/favorites',
    name: 'Favorites',
    component: TheFavorites,
    props: true
  },
  {
    path: '/cosmetics_store/cart',
    name: 'Cart',
    component: TheCart,
    props: true
  },
  {
    path: '/cosmetics_store/questions',
    name: 'Questions',
    component: TheQuestions,
    props: true
  },
  {
    path: '/cosmetics_store/hotline',
    name: 'Hotline',
    component: TheHotline,
    props: true
  },
  {
    path: '/cosmetics_store/sitemap',
    name: 'SiteMap',
    component: SiteMap,
    props: true
  },
  {
    path: '/cosmetics_store/offer',
    name: 'Offer',
    component: OfferView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
<template>
  <div id="app">
    <header class="app-bar">
      <button class="burger" @click="showMobileMenu = true" v-if="isMobile"><span></span><span></span><span></span></button>
      <div class="tabs-left" :class="{hidden: isMobile}">
        <router-link to="/cosmetics_store/catalog" class="tab">Каталог</router-link>
        <router-link to="/cosmetics_store/about" class="tab">О нас</router-link>
      </div>
      <div class="center-tab-wrapper">
        <router-link to="/cosmetics_store/" class="tab center-tab">
          <h1>Akkery</h1>
        </router-link>
      </div>
      <div class="tabs-right" :class="{hidden: isMobile}">
        <router-link
          :to="currentUser ? '/cosmetics_store/account' : '/cosmetics_store/auth'"
          class="tab"
        >
          <img src="../src/assets/user.svg" />
        </router-link>
        <router-link to="/cosmetics_store/favorites" class="tab"><img src="../src/assets/ph_heart.svg"></router-link>
        <router-link to="/cosmetics_store/cart" class="tab"><img src="../src/assets/корзина.svg"></router-link>
      </div>
    </header>
    <transition name="fade">
      <div v-if="showMobileMenu" class="mobile-menu-overlay" @click.self="showMobileMenu = false">
        <nav class="mobile-menu">
          <button class="close-btn" @click="showMobileMenu = false">×</button>
          <router-link to="/cosmetics_store/" @click="showMobileMenu = false">Главная</router-link>
          <router-link to="/cosmetics_store/catalog" @click="showMobileMenu = false">Каталог</router-link>
          <router-link to="/cosmetics_store/about" @click="showMobileMenu = false">О нас</router-link>
          <router-link to="/cosmetics_store/account" @click="showMobileMenu = false">Профиль</router-link>
          <router-link to="/cosmetics_store/favorites" @click="showMobileMenu = false">Избранное</router-link>
          <router-link to="/cosmetics_store/cart" @click="showMobileMenu = false">Корзина</router-link>
          <router-link to="/cosmetics_store/questions" @click="showMobileMenu = false">Вопросы</router-link>
          <router-link to="/cosmetics_store/offer" @click="showMobileMenu = false">Оферта</router-link>
          <router-link to="/cosmetics_store/def" @click="showMobileMenu = false">защита прав</router-link>
        </nav>
      </div>
    </transition>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="app-footer">
      <hr />
      <div style="display: flex; justify-content: space-between; padding-left: 20px; padding-right: 20px;">
        <div class="tabs-left">
          <a href="https://t.me/+TV5Ptp9NX4Q3MDQy" class="tab">Следите за нами <img src="../src/assets/icons8-телеграм-32.png" width="25" height="25"></a>
          <router-link to="/cosmetics_store/questions" class="tab">Частые вопросы</router-link>
          <router-link to="/cosmetics_store/def" class="tab">защита прав</router-link>
        </div>
        <router-link to="/cosmetics_store/" class="tab center-tab">
          <h1>Akkery</h1>
        </router-link>
        <div class="tabs-right">
          <router-link to="/cosmetics_store/offer" class="tab">Оферта</router-link>
          <a href="https://t.me/Akkery_bot" class="tab">Поддержка</a>
          <router-link to="/cosmetics_store/hotline" class="tab">Горячая линия</router-link>
        </div>
      </div>
      <div v-if="isHome" class="user-count-footer">Пользователей на сайте: {{ userCount }}</div>
    </footer>
    <div class="scroll-to-top" @click="scrollToTop" v-if="showScrollButton">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-circle">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="16 12 12 8 8 12"/>
        <line x1="12" y1="16" x2="12" y2="8"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const currentUser = computed(() => store.getters.getCurrentUser)
const userCount = computed(() => store.getters.usersCount || store.state.users.length)
const isHome = computed(() => route.path === '/cosmetics_store/' || route.name === 'Home')

const showScrollButton = ref(false)
const showMobileMenu = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 700
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', checkMobile)
  checkMobile()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkMobile)
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
const handleScroll = () => {
  if (window.pageYOffset > 300) {
    showScrollButton.value = true
  } else {
    showScrollButton.value = false
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-bar {
  background-color: #fff;
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1.5px solid #000;
  position: relative;
  z-index: 10;
}
.tabs-left, .tabs-right {
  display: flex;
  gap: 20px;
  align-items: center;
}
.center-tab-wrapper {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-tab {
  flex-grow: 0;
  text-align: center;
}
.tab {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 4px;
}
.tab h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}
.main-content {
  flex: 1;
  padding: 1rem 0.5rem;
  overflow-y: auto;
}
.app-footer {
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 1rem 0.5rem;
  background: #f9f9f9;
  border-top: 1px solid #00000011;
}
.app-footer > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.user-count-footer {
  padding-left: 40px;
  text-align: left;
  color: #222;
  font-size: 1.1rem;
  margin-top: 10px;
  margin-bottom: 8px;
}
.burger {
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
}
.burger span {
  display: block;
  width: 28px;
  height: 3px;
  background: #222;
  border-radius: 2px;
}
.mobile-menu-overlay {
  position: fixed;
  z-index: 1000;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  justify-content: flex-end;
}
.mobile-menu {
  background: #fff;
  width: 80vw;
  max-width: 320px;
  height: 100vh;
  box-shadow: -2px 0 16px #0002;
  display: flex;
  flex-direction: column;
  padding: 24px 18px 18px 18px;
  gap: 18px;
  position: relative;
  animation: slideIn 0.2s;
}
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 18px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #222;
}
.mobile-menu a, .mobile-menu .router-link-active {
  font-size: 1.1rem;
  color: #222;
  text-decoration: none;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  transition: color 0.2s;
}
.mobile-menu a:hover {
  color: #1976d2;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.hidden {
  display: none !important;
}
@media (max-width: 900px) {
  .app-bar {
    flex-direction: column;
    gap: 10px;
    padding: 10px 4px;
  }
  .tabs-left, .tabs-right {
    gap: 10px;
  }
  .main-content {
    padding: 0.5rem 0.2rem;
  }
  .app-footer > div {
    flex-direction: column;
    gap: 8px;
    padding-left: 0;
    padding-right: 0;
  }
}
@media (max-width: 700px) {
  .app-bar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 2vw;
    gap: 2px;
    min-height: 44px;
  }
  .tabs-left, .tabs-right, .center-tab {
    display: none !important;
  }
  .burger {
    display: flex;
  }
  .main-content {
    padding: 0 !important;
  }
  .app-footer {
    padding: 0.5rem 0.2rem;
    font-size: 0.95em;
  }
  .app-footer > div {
    flex-direction: column;
    gap: 6px;
    padding-left: 0;
    padding-right: 0;
  }
  .user-count-footer {
    font-size: 1em;
    margin-top: 6px;
    margin-bottom: 4px;
  }
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(180,180,180,0.18);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(120,120,120,0.18);
  }
  html, body, #app, .main-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(180,180,180,0.18) transparent;
  }
}
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background-color: #f9f9f9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.13);
  transition: opacity 0.3s ease-in-out;
  opacity: 0.85;
  z-index: 2000;
}
.scroll-to-top svg {
  width: 28px;
  height: 28px;
}
.scroll-to-top:hover {
  opacity: 1;
}
</style>
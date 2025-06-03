<template>
  <div id="app">
    <header class="app-bar">
      <div class="tabs-left">
        <router-link to="/cosmetics_store/catalog" class="tab">Каталог</router-link>
        <router-link to="/cosmetics_store/about" class="tab">О нас</router-link>
      </div>
      <router-link to="/cosmetics_store/" class="tab center-tab">
        <h1>Akkery</h1>
      </router-link>
      <div class="tabs-right">
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

    <main class="main-content">
      <router-view />
    </main>

    <footer class="app-footer">
      <hr />
      <div style="display: flex; justify-content: space-between; padding-left: 20px; padding-right: 20px;">
        <div class="tabs-left">
          <a href="https://t.me/ztoylo" class="tab">Следите за нами</a>
          <router-link to="/cosmetics_store/questions" class="tab">Частые вопросы</router-link>
        </div>
        <router-link to="/cosmetics_store/" class="tab center-tab">
          <h1>Akkery</h1>
        </router-link>
        <div class="tabs-right">
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

// Переменная для отслеживания видимости кнопки
const showScrollButton = ref(false)

// Метод прокрутки наверх
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Функция проверки положения прокрутки
const handleScroll = () => {
  if (window.pageYOffset > 300) {
    showScrollButton.value = true
  } else {
    showScrollButton.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-bar {
  background-color: #f9f9f9;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
}

.tab {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
}

.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #000000;
}

.tabs-left, .tabs-right {
  display: flex;
  gap: 20px;
}

.center-tab {
  flex-grow: 1;
  text-align: center;
}

.tab {
  text-decoration: none;
  color: inherit;
  padding: 10px;
}

.tab h1 {
  margin: 0;
  font-size: 24px;
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.app-footer {
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 1rem;
}

/* Кнопка возврата наверх */
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #f9f9f9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out;
  opacity: 0.8;
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
}

.scroll-to-top:hover {
  opacity: 1;
}

.user-count-footer {
  text-align: center;
  color: #222;
  font-size: 1.1rem;
  margin-top: 10px;
  margin-bottom: 8px;
}

/* --- Адаптив --- */
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
    padding: 0.5rem;
  }
  .app-footer > div {
    flex-direction: column !important;
    gap: 10px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
@media (max-width: 600px) {
  .app-bar {
    flex-direction: column;
    gap: 4px;
    padding: 6px 2px;
  }
  .tab {
    font-size: 1em;
    padding: 6px 4px;
  }
  .tab h1 {
    font-size: 18px;
  }
  .main-content {
    padding: 0.2rem;
  }
  .app-footer {
    padding: 0.5rem;
    font-size: 0.95em;
  }
  .app-footer > div {
    flex-direction: column !important;
    gap: 6px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .user-count-footer {
    font-size: 1em;
    margin-top: 6px;
    margin-bottom: 4px;
  }
}
</style>
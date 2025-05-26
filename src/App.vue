<template>
  <div id="app">
    <header class="app-bar">
      <div class="tabs-left">
        <router-link to="/catalog" class="tab">Каталог</router-link>
        <router-link to="/about" class="tab">О нас</router-link>
      </div>
      <router-link to="/" class="tab center-tab">
        <h1>Akkery</h1>
      </router-link>
      <div class="tabs-right">
      <router-link to="/user" class="tab"><img src="../src/assets/user.svg"></router-link>
        <router-link to="/Favorites" class="tab"><img src="../src/assets/ph_heart.svg"></router-link>
        <router-link to="/Cart" class="tab"><img src="../src/assets/корзина.svg"></router-link>
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
          <router-link to="/questions" class="tab">Частые вопросы</router-link>
        </div>
        <router-link to="/" class="tab center-tab">
          <h1>Akkery</h1>
        </router-link>
        <div class="tabs-right">
          <a href="https://t.me/Akkery_bot" class="tab">Поддержка</a>
          <router-link to="/hotline" class="tab">Горячая линия</router-link>
        </div>
      </div>
    </footer>

    <!-- Плавающая кнопка возврата наверх -->
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
import { ref, onMounted, onUnmounted } from 'vue'

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
</style>
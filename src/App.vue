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
        <router-link to="/Favorites" class="tab">избранное</router-link>
        <router-link to="/Cart" class="tab">карзина</router-link>
      </div>
    </header>

    <main class="main-content">
      <router-view/>
    </main>

    <footer class="app-footer">
       <hr>
      <div style="display: flex; justify-content: space-between; padding-top: 100px;">
        <p>Следите за нами</p>
        <p>Частые вопросы</p>
        <h1 style="text-align: center;">akkery</h1>
        <p>Обмен и возврат</p>
        <p>Горячая линия</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
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
</style>
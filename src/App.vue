<template>
  <div class="page">
    <header class="header">
            <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item" @click="router.push('/about')">Каталог</li>
          <li class="nav__item">О нас</li>
        </ul>
      </nav>
      <span class="logo">akkery</span>

      <div class="header__icons">
        <button class="icon icon--search" aria-label="Поиск"></button>
        <button class="icon icon--cart" aria-label="Корзина"></button>
      </div>
    </header>
    </div>
  <div id="app">
    <TheHeader />
  </div>
    <footer class="footer">
      <hr>
      <div style="display: flex; justify-content: space-between; padding-top: 100px;">
        <p>Следите за нами</p>
        <p>Частые вопросы</p>
        <h1 style="text-align: center;">akkery</h1>
        <p>Обмен и возврат</p>
        <p>Горячая линия</p>
      </div>
    </footer>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: { 
    TheHeader 
  }
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

.header {
  width: 100%;
  height: 100px;
  background:#e2e2e2;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 20px;
}
.logo { font: 32px 'Montserrat', sans-serif; }

.nav__list { list-style:none; display:flex; gap:42px; }
.nav__item { font-family:'Montserrat',sans-serif; cursor:pointer; }

.header__icons { display:flex; gap:20px; }

.icon {
  width:30px; height:30px; border:none; background:#fff; cursor:pointer;
}
.icon--cart   { width:29px; height:29px; }
.icon--search::before,
.icon--cart::before  {
  content:''; display:block; width:100%; height:100%; background:#000;
}
.footer {
  position: fixed;
  top: 80%;
  right: 0;
  bottom: 0;
  padding-left: 1%;
  padding-right: 1%;
  text-align: center; 
  width: 100%;   
  font-size: 25px;
  font-weight: bold;
  color: #000000;  
}
</style>
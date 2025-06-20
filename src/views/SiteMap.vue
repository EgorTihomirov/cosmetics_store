<template>
  <div class="site-map-container">
    <h1>Карта сайта</h1>
    <div class="site-map-list">
      <router-link class="site-map-card" to="/cosmetics_store/">Главная</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/catalog">Каталог</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/favorites">Избранное</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/cart">Корзина</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/account">Профиль</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/about">О нас</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/questions">Вопросы</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/hotline">Горячая линия</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/offer">Оферта</router-link>
      <router-link class="site-map-card" to="/cosmetics_store/def">защита прав</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.site-map-container {
  max-width: 700px;
  margin: 40px auto;
  background: #f6f6f6;
  border-radius: 18px;
  box-shadow: 0 4px 24px #0001;
  padding: 32px 20px 24px 20px;
}
h1 {
  text-align: center;
  margin-bottom: 32px;
  font-size: 2rem;
  font-weight: 700;
}
.site-map-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
}
.site-map-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  min-height: 60px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
  text-decoration: none;
  transition: box-shadow 0.2s, color 0.2s, background 0.2s;
  padding: 0 18px;
}
.site-map-card:hover {
  color: #1976d2;
  box-shadow: 0 4px 16px #1976d233;
  background: #f4f7ff;
}
@media (max-width: 600px) {
  .site-map-container {
    padding: 8px 2px 6px 2px;
    border-radius: 10px;
  }
  .site-map-card {
    min-width: 90px;
    min-height: 36px;
    font-size: 0.95rem;
    padding: 0 6px;
    border-radius: 7px;
  }
  h1 {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
}
</style> 
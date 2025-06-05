<template>
  <!-- Главная страница сайта. Здесь отображаются баннеры, карусели товаров и мобильный placeholder. -->
  <img src="../assets/новая коллекция.svg" style="width: 100%;">
  <img src="../assets/прем.svg" style="width: 100%;">
  <h1 style="text-align: center;" v-show="!isMobile">Новинки</h1>
  <div class="carousel-wrapper" v-if="newProducts && newProducts.length > 0" v-show="!isMobile">
    <button class="arrow left" @click="scrollLeftNew">←</button>
    <div class="carousel" :class="newAnimation">
      <div
        v-for="(product, index) in visibleNewProducts"
        :key="index"
        class="carousel-item"
      >
        <ProductCard :image="product.image" :title="product.title" :price="product.price" :id="product.id"></ProductCard>
      </div>
    </div>
    <button class="arrow right" @click="scrollRightNew">→</button>
  </div>
  <div v-if="isMobile" class="mobile-placeholder">
    <div class="mobile-placeholder-icon">🛍️</div>
    <div class="mobile-placeholder-text">Откройте каталог, чтобы увидеть товары</div>
    <router-link to="/cosmetics_store/catalog" class="mobile-placeholder-btn">Перейти в каталог</router-link>
  </div>
  <h1 style="text-align: center;" v-show="!isMobile">Популярное</h1>
  <div class="carousel-wrapper" v-if="popularProducts && popularProducts.length > 0" v-show="!isMobile">
    <button class="arrow left" @click="scrollLeftPopular">←</button>
    <div class="carousel" :class="popularAnimation">
      <div
        v-for="(product, index) in visiblePopularProducts"
        :key="index"
        class="carousel-item"
      >
        <ProductCard :image="product.image" :title="product.title" :price="product.price" :id="product.id"></ProductCard>
      </div>
    </div>
    <button class="arrow right" @click="scrollRightPopular">→</button>
  </div>
  <img src="../assets/статьи.svg" style="width: 100%;">
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue';
import { useStore } from 'vuex';

const store = useStore();

const products = computed(() => store.getters.getAllProducts);

const newProducts = computed(() => products.value.slice(0, 6));
const popularProducts = computed(() => products.value.slice(6, 12));

const visibleCount = 4;

const newStartIndex = ref(0);
const newAnimation = ref('');
const visibleNewProducts = computed(() => {
  const arr = [];
  for (let i = 0; i < visibleCount; i++) {
    arr.push(newProducts.value[(newStartIndex.value + i) % newProducts.value.length]);
  }
  return arr;
});
function scrollLeftNew() {
  newAnimation.value = 'slide-right';
  setTimeout(() => {
    newStartIndex.value = (newStartIndex.value - 1 + newProducts.value.length) % newProducts.value.length;
    newAnimation.value = '';
  }, 300);
}
function scrollRightNew() {
  newAnimation.value = 'slide-left';
  setTimeout(() => {
    newStartIndex.value = (newStartIndex.value + 1) % newProducts.value.length;
    newAnimation.value = '';
  }, 300);
}

const popularStartIndex = ref(0);
const popularAnimation = ref('');
const visiblePopularProducts = computed(() => {
  const arr = [];
  for (let i = 0; i < visibleCount; i++) {
    arr.push(popularProducts.value[(popularStartIndex.value + i) % popularProducts.value.length]);
  }
  return arr;
});
function scrollLeftPopular() {
  popularAnimation.value = 'slide-right';
  setTimeout(() => {
    popularStartIndex.value = (popularStartIndex.value - 1 + popularProducts.value.length) % popularProducts.value.length;
    popularAnimation.value = '';
  }, 300);
}
function scrollRightPopular() {
  popularAnimation.value = 'slide-left';
  setTimeout(() => {
    popularStartIndex.value = (popularStartIndex.value + 1) % popularProducts.value.length;
    popularAnimation.value = '';
  }, 300);
}

const isMobile = ref(window.innerWidth <= 600);
function handleResize() {
  isMobile.value = window.innerWidth <= 600;
}
if (typeof window !== 'undefined') {
  window.addEventListener('resize', handleResize);
}
</script>

<style scoped>
.carousel-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 600px;
  margin: 40px auto;
}
.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
  justify-content: center;
  transition: transform 0.3s, opacity 0.3s;
}
.carousel.slide-left {
  animation: slideLeft 0.3s;
}
.carousel.slide-right {
  animation: slideRight 0.3s;
}
@keyframes slideLeft {
  from { transform: translateX(100px); opacity: 0.5; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slideRight {
  from { transform: translateX(-100px); opacity: 0.5; }
  to { transform: translateX(0); opacity: 1; }
}
.carousel-item {
  flex: 0 0 110px;
  margin: 0 7px;
  background: #f6f6f6;
  border-radius: 10px;
  text-align: center;
  padding: 10px 5px;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.arrow {
  font-size: 24px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 0px;
  cursor: pointer;
  user-select: none;
}
.arrow:active {
  background: #eee;
}
@media (max-width: 900px) {
  .carousel-wrapper {
    height: 340px;
  }
  .carousel-item {
    flex: 0 0 90px;
    margin: 0 4px;
    padding: 6px 2px;
  }
  .arrow {
    font-size: 20px;
    padding: 6px;
  }
}
@media (max-width: 600px) {
  h1 {
    font-size: 1.1rem;
    margin: 10px 0 6px 0;
  }
  .carousel-wrapper {
    height: 180px;
    margin: 10px auto;
  }
  .carousel-item {
    flex: 0 0 60px;
    margin: 0 2px;
    padding: 2px 1px;
  }
  .arrow {
    font-size: 16px;
    padding: 4px;
  }
}
.mobile-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  border-radius: 16px;
  box-shadow: 0 2px 12px #0001;
  margin: 16px 0 18px 0;
  padding: 32px 12px 24px 12px;
  min-height: 120px;
  max-width: 98vw;
}
.mobile-placeholder-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.mobile-placeholder-text {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
}
.mobile-placeholder-btn {
  background: #fff;
  color: #1976d2;
  border: 1.5px solid #1976d2;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 4px #1976d211;
}
.mobile-placeholder-btn:hover {
  background: #1976d2;
  color: #fff;
}
@media (min-width: 601px) {
  .mobile-placeholder { display: none; }
}
</style>
<template>
  <img src="../assets/новая коллекция.svg" style="width: 100%;">
  <img src="../assets/прем.svg" style="width: 100%;">
  <h1 style="text-align: center;">Новинки</h1>
  <div class="carousel-wrapper">
    <button class="arrow left" @click="scrollLeft">←</button>
    <div class="carousel">
      <div
        v-for="(product, index) in visibleProducts"
        :key="index"
        class="carousel-item"
      >
        <ProductCard :image="product.image" :title="product.title" :price="product.price" :id="product.id"></ProductCard>
      </div>
    </div>
    <button class="arrow right" @click="scrollRight">→</button>
  </div>
  <h1 style="text-align: center;">Популярное</h1>
  <div class="carousel-wrapper">
    <button class="arrow left" @click="scrollLeft">←</button>
    <div class="carousel">
      <div
        v-for="(product, index) in visibleProducts"
        :key="index"
        class="carousel-item"
      >
        <ProductCard :image="product.image" :title="product.title" :price="product.price" :id="product.id"></ProductCard>
      </div>
    </div>
    <button class="arrow right" @click="scrollRight">→</button>
  </div>
  <img src="../assets/статьи.svg" style="width: 100%;">
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue';
import { useStore } from 'vuex';

const store = useStore();

const products = computed(() => store.getters.getAllProducts);

const visibleCount = 4
const startIndex = ref(0)

const visibleProducts = computed(() => {
  const res = []
  for (let i = 0; i < visibleCount; i++) {
    res.push(products.value[(startIndex.value + i) % products.value.length])
  }
  return res
})

function scrollLeft() {
  startIndex.value =
    (startIndex.value - 1 + products.value.length) % products.value.length
}

function scrollRight() {
  startIndex.value = (startIndex.value + 1) % products.value.length
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
</style>
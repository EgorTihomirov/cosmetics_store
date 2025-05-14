<template>
  <div class="favorites">
    <h2>Товары</h2>
    <ul>
      <li v-for="item in favorites" :key="item.id">
        <img @click="onDetailsClick" src="../assets/крем.svg" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ item.price }}</p>
          <button @click="removeFromFavorites(item.id)">Удалить</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheFavorites',
  computed: {
    favorites() {
      return this.$store.getters.getFavorites;
    }
  },
  methods: {
    onDetailsClick() {
      // Логика для перехода на страницу товара
    },
    removeFromFavorites(productId) {
      this.$store.dispatch('removeFromFavorites', productId);
    }
  }
}
</script>

<style scoped>
.favorites {
  padding: 20px;
}

.product-image {
  width: 100px;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  margin-right: 10px;
}

.product-info {
  display: inline-block;
  vertical-align: top;
}

.product-info button {
  background-color: #6C8CD5;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.product-info button:hover {
  background-color: #5A7ABF;
}
</style>
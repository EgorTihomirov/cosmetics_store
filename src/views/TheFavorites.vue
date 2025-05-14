<template>
  <div class="favorites">
    <h2>Товары</h2>
    <ul>
      <li v-for="item in favorites" :key="item.id">
        <img @click="onDetailsClick" src="../assets/крем.svg" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ item.price }}</p>
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
</style>
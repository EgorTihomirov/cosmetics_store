<template>
  <div class="favorites">
    <h2>Товары</h2>
    <ul>
      <li v-for="item in favorites" :key="item.id">
        <img :src="getImageUrl(item.image)" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ item.price }}</p>
          <button class="main-btn" @click="removeFromFavorites(item.id)">Удалить</button>
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
    removeFromFavorites(productId) {
      this.$store.dispatch('removeFromFavorites', productId);
    },
    getImageUrl(imagePath) {
      if (/^(http|https|data):/.test(imagePath)) return imagePath;
      try {
        if (typeof require !== 'undefined') {
          return require('@/assets/' + imagePath.replace('../assets/', ''));
        }
        return '';
      } catch {
        return '';
      }
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

.main-btn {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 2px solid #222;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}
.main-btn:hover {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}

@media (max-width: 900px) {
  .favorites {
    padding: 8px;
  }
  ul {
    padding: 0;
  }
  li {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 10px 4px 10px 4px;
  }
  .product-image {
    width: 100%;
    max-width: 180px;
    height: auto;
    margin: 0 auto 8px auto;
    display: block;
  }
  .main-btn {
    font-size: 1em;
    padding: 8px 8px;
    border-radius: 6px;
    margin-top: 4px;
  }
}
@media (max-width: 600px) {
  .favorites {
    padding: 4px;
  }
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
  }
  .main-btn {
    font-size: 1em;
    padding: 8px 8px;
    border-radius: 6px;
    margin-top: 4px;
  }
}
</style>
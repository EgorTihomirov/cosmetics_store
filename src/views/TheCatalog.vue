<template>
  <div class="catalog">
    <div class="filters">
      <h2>Фильтры</h2>
      <div class="category-filter">
        <button class="main-btn" :class="{active: selectedCategory === ''}" @click="selectCategory('')">Все</button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="main-btn"
          :class="{active: selectedCategory === cat}"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
      <div class="search">
        <label for="search">Поиск:</label>
        <input type="text" id="search" v-model="searchQuery" placeholder="Введите название товара" />
      </div>
      <div class="price-range">
        <label for="price-range">Цена:</label>
        <input type="range" id="price-range" v-model="priceRange" min="0" max="10000" step="50" />
        <span>{{ priceRange }} ₽</span>
      </div>
    </div>
    <div class="results">
      <h2>Результаты</h2>
      <ul>
        <li v-for="product in filteredProducts" :key="product.id" class="catalog-item">
          <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>Цена: {{ product.price }} ₽</p>
            <p>{{ product.description }}</p>
            <div class="catalog-btns">
              <button class="main-btn" :disabled="isInCart(product.id)" @click="addToCart(product)">
                {{ isInCart(product.id) ? 'В корзине' : 'В корзину' }}
              </button>
              <button class="main-btn" :disabled="isInFavorites(product.id)" @click="addToFavorites(product)">
                {{ isInFavorites(product.id) ? 'В избранном' : 'В избранное' }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TheCatalog',
  data() {
    return {
      searchQuery: '',
      priceRange: 10000,
      minPrice: 0,
      selectedCategory: ''
    };
  },
  computed: {
    ...mapGetters(['getAllProducts', 'getCart', 'getFavorites']),
    categories() {
      const cats = this.getAllProducts.map(p => p.category)
      return [...new Set(cats)]
    },
    filteredProducts() {
      const search = this.searchQuery.toLowerCase();
      const min = parseInt(this.minPrice);
      const max = parseInt(this.priceRange);
      return this.getAllProducts.filter(product => {
        return (
          (this.selectedCategory === '' || product.category === this.selectedCategory) &&
          product.title.toLowerCase().includes(search) &&
          product.price >= min &&
          product.price <= max
        );
      });
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    addToFavorites(product) {
      this.$store.dispatch('addToFavorites', product);
    },
    isInCart(productId) {
      return this.getCart.some(item => item.id === productId);
    },
    isInFavorites(productId) {
      return this.getFavorites.some(item => item.id === productId);
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
    },
    selectCategory(cat) {
      this.selectedCategory = cat;
    }
  }
}
</script>

<style scoped>
.catalog {
  display: flex;
  padding: 20px;
}

.filters {
  width: 220px;
  margin-right: 20px;
  border-right: 1px solid #ccc;
  padding-right: 20px;
}

.results {
  flex: 1;
}

.search {
  margin-bottom: 10px;
}

.search input {
  border: none;
  padding: 10px;
  transition: border 0.3s;
  width: 100%;
  box-sizing: border-box;
}

.search input:focus {
  border: 2px solid black;
}

.price-range {
  margin-bottom: 10px;
}

.price-range input[type="range"] {
  width: 100%;
  height: 20px;
  border-radius: 20px;
  -webkit-appearance: none;
  background: #e6e6fa;
  outline: none;
}

.price-range input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #9370db; 
  cursor: pointer;
}

.catalog-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 24px;
  background: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.04);
  padding: 18px 18px 14px 18px;
}
.product-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  margin-right: 10px;
}
.product-info {
  flex: 1;
}
.catalog-btns {
  display: flex;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.main-btn {
  font-size: 1.1em;
  padding: 8px 18px;
  background-color: white;
  color: black;
  border: 2px solid #222;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.main-btn:disabled {
  color: #aaa;
  border: 2px solid #aaa;
  background: #f4f4f4;
  cursor: not-allowed;
}
.main-btn:hover:not(:disabled) {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}
.category-filter {
  margin-bottom: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.category-filter .main-btn.active {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}

/* --- Адаптив --- */
@media (max-width: 900px) {
  .catalog {
    flex-direction: column;
    padding: 10px;
  }
  .filters {
    width: 100%;
    margin-right: 0;
    border-right: none;
    border-bottom: 1px solid #ccc;
    padding-right: 0;
    padding-bottom: 16px;
    margin-bottom: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .results {
    width: 100%;
  }
  .category-filter {
    width: 100%;
    gap: 8px;
    justify-content: flex-start;
  }
  .catalog-item {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px 8px 12px 8px;
  }
  .product-image {
    width: 100%;
    max-width: 220px;
    height: auto;
    margin: 0 auto 8px auto;
    display: block;
  }
  .catalog-btns {
    flex-direction: column;
    gap: 8px;
  }
}
@media (max-width: 600px) {
  .catalog {
    padding: 4px;
  }
  .filters {
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .category-filter {
    gap: 6px;
  }
  .main-btn {
    font-size: 1em;
    padding: 8px 8px;
  }
  .catalog-item {
    padding: 8px 2px 8px 2px;
    margin-bottom: 12px;
  }
  .product-image {
    max-width: 100%;
    height: auto;
  }
}
</style>
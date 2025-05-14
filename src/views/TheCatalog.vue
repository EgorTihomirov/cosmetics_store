<template>
  <div class="catalog">
    <div class="filters">
      <h2>Фильтры</h2>
      <div class="search">
        <label for="search">Поиск:</label>
        <input type="text" id="search" v-model="searchQuery" placeholder="Введите название товара" />
      </div>
      <div class="price-range">
        <label for="price-range">Цена:</label>
        <input type="range" id="price-range" v-model="priceRange" min="0" max="10000" step="50" />
        <span>{{ priceRange }} ₽</span>
      </div>
      <div class="categories">
        <h3>Категории</h3>
        <button class="buttons" @click="filterProducts('Уход за кожей')">Уход за кожей</button>
        <button class="buttons" @click="filterProducts('Уход за волосами')">Уход за волосами</button>
        <button class="buttons" @click="filterProducts('Личная гигиена')">Личная гигиена</button>
      </div>
    </div>
    <div class="results">
      <h2>Результаты</h2>
      <ul>
        <li v-for="product in filteredProducts" :key="product.id">
          <img src="../assets/крем.svg" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>Цена: {{ product.price }}</p>
            <p>Описание: {{ product.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCatalog',
  data() {
    return {
      searchQuery: '',
      priceRange: 5000
    };
  },
  computed: {
    filteredProducts() {
      const search = this.searchQuery.toLowerCase();
      const price = parseInt(this.priceRange);
      return this.$store.getters.getAllProducts.filter(product => {
        return (
          product.title.toLowerCase().includes(search) &&
          parseInt(product.price.replace('₽', '')) <= price
        );
      });
    }
  },
  methods: {
    filterProducts(category) {
      this.$store.dispatch('filterProducts', category);
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
  width: 200px;
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

.categories button {
  display: block;
  margin-bottom: 5px;
}

.buttons {
  background-color: rgba(147, 112, 219, 0.5);
  color: #9370db;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.buttons:hover {
  background-color: #9370db; 
  color: white;
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
<template>
  <div class="product-details">
    <div class="product-image-container">
      <img src="../assets/крем.svg" alt="Product Image" class="product-image" />
    </div>
    <div class="product-info">
      <h1 style="padding-bottom: 20px;">{{ product.title }}</h1>
      <p style="padding-bottom: 20px;">Цена: {{ product.price }}</p>
      <br>
      <h1 style="padding-bottom: 30px;">Наличие доставки:</h1>
      <p style="padding-bottom: 10px;">Экспресс-доставка ............от 3 часов</p>
      <p style="padding-bottom: 10px;">Курьер ...................................от 3 часов</p>
      <p style="padding-bottom: 70px;">Самовывоз ...........................от 3 часов</p>
      <div class="buttons">
        <button class="add" @click="addToCart(product)">Добавить в корзину</button>
        <button class="add" @click="addToFavorites(product)">Добавить в избранное</button>
      </div>
    </div>
  </div>
  <div class="info">
    <h2>Описание:</h2>
    <p>{{ product.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductDetails',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    product() {
      return this.$store.getters.getProductById(this.id);
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    addToFavorites(product) {
      this.$store.dispatch('addToFavorites', product);
    }
  }
}
</script>

<style scoped>
.product-details {
  padding: 20px;
  display: flex;
  align-items: flex-start;
}

.product-image-container {
  margin-right: 20px;
}

.product-image {
  width: 450px;
  height: auto;
  max-height: 50%;
  object-fit: contain;
  border-radius: 4px;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.info{
  padding-left: 50px;
}

.product-info h1 {
  margin: 0;
  font-size: 1.5em;
}

.product-info p {
  margin: 0;
  font-size: 1.2em;
}

.buttons {
  display: flex;
  margin-top: 10px;
}

.add {
  background-color: #6C8CD5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.add:hover {
  background-color: #5A7ABF;
}
</style>
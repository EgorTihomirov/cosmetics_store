<template>
  <div class="cart">
    <h2>Товары</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        <img @click="onDetailsClick" src="../assets/крем.svg" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ item.price }}</p>
          <button @click="removeFromCart(item.id)">Удалить</button>
        </div>
      </li>
    </ul>
    <button v-if="cart.length > 0" class="checkout-button" @click="startCheckout">Начать оплату</button>
  </div>
</template>

<script>
export default {
  name: 'TheCart',
  computed: {
    cart() {
      return this.$store.getters.getCart;
    }
  },
  methods: {
    onDetailsClick() {
      // Логика для перехода на страницу товара
    },
    startCheckout() {
      alert('Извините, в данный момент оплата недоступна из-за технических работ. Пожалуйста, попробуйте позже.');
    },
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId);
    }
  }
}
</script>

<style scoped>
.cart {
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

.checkout-button {
  background-color: #6C8CD5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.checkout-button:hover {
  background-color: #5A7ABF;
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
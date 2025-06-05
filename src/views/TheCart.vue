<template>
  <div class="cart">
    <h2>Товары</h2>
    <ul>
      <li v-for="item in cart" :key="item.id" @click="goToProduct(item.id)" style="cursor:pointer;">
        <img :src="getImageUrl(item.image)" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ item.price }} ₽</p>
          <button class="main-btn" @click.stop="removeFromCart(item.id)">Удалить</button>
        </div>
      </li>
    </ul>
    <p v-if="cart.length > 0">Сумма: {{ totalSum }} ₽</p>
    <button v-if="cart.length > 0" class="main-btn" @click="startCheckout">Начать оплату</button>
  </div>
</template>

<script>
export default {
  name: 'TheCart',
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    totalSum() {
      return this.$store.getters.cartTotalSum;
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId);
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
    startCheckout() {
      alert('Извините, в данный момент оплата недоступна из-за технических работ. Пожалуйста, попробуйте позже.');
    },
    goToProduct(id) {
      this.$router.push({ name: 'ProductDetails', params: { id } });
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

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 18px;
  background: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.04);
  padding: 14px 10px 10px 10px;
  transition: box-shadow 0.2s;
}
li:hover {
  box-shadow: 0 4px 16px #1976d233;
}

@media (max-width: 900px) {
  .cart {
    padding: 8px;
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
  .cart {
    padding: 4px;
  }
  li {
    padding: 4px 2px 6px 2px;
    border-radius: 7px;
    font-size: 0.97em;
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
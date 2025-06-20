<template>
  <div class="cart">
    <h2>Корзина</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Ваша корзина пуста</p>
    </div>
    <ul v-else>
      <li v-for="item in cartItems" :key="item.product.id" class="cart-item">
        <img :src="getImageUrl(item.product.image)" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3 @click="goToProduct(item.product.id)" style="cursor:pointer;">{{ item.product.title }}</h3>
          <p>Цена: {{ item.product.price }} ₽</p>
          <div class="quantity-controls">
            <button class="quantity-btn" @click.stop="decreaseQuantity(item.product.id)">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="quantity-btn" @click.stop="increaseQuantity(item.product.id)">+</button>
          </div>
          <p>Сумма: {{ item.product.price * item.quantity }} ₽</p>
        </div>
        <button class="remove-btn" @click.stop="removeFromCart(item.product.id)">×</button>
      </li>
    </ul>
    <div v-if="cartItems.length > 0" class="cart-summary">
      <p>Общая сумма: {{ totalSum }} ₽</p>
      <p>Товаров: {{ totalItems }} шт.</p>
      <button class="checkout-btn" @click="startCheckout">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCart',
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    totalSum() {
      return this.$store.getters.cartTotalSum;
    },
    totalItems() {
      return this.$store.getters.cartTotalItems;
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId);
    },
    increaseQuantity(productId) {
      this.$store.dispatch('updateQuantity', { productId, quantity: this.getCurrentQuantity(productId) + 1 });
    },
    decreaseQuantity(productId) {
      this.$store.dispatch('updateQuantity', { productId, quantity: this.getCurrentQuantity(productId) - 1 });
    },
    getCurrentQuantity(productId) {
      const item = this.cartItems.find(item => item.product.id === productId);
      return item ? item.quantity : 0;
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
  max-width: 800px;
  margin: 0 auto;
}

.empty-cart {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  background: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.04);
  padding: 20px;
  position: relative;
  transition: box-shadow 0.2s;
}

.cart-item:hover {
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.2);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 4px;
}

.product-info {
  flex-grow: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: #f0f0f0;
}

.quantity {
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 5px;
}

.remove-btn:hover {
  color: #f44336;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: right;
}

.cart-summary p {
  margin: 10px 0;
  font-size: 18px;
}

.checkout-btn {
  font-size: 1.2em;
  padding: 12px 24px;
  background-color: #3a4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.checkout-btn:hover {
  background-color: #2c3eaa;
}

@media (max-width: 768px) {
  .cart {
    padding: 10px;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 15px;
  }
  
  .product-image {
    width: 100%;
    max-width: 200px;
    height: auto;
    margin: 0 auto;
  }
  
  .quantity-controls {
    margin: 8px 0;
  }
}

@media (max-width: 480px) {
  .cart-item {
    padding: 10px;
  }
  
  .product-info h3 {
    font-size: 16px;
  }
  
  .checkout-btn {
    font-size: 1em;
    padding: 10px 20px;
  }
}
</style>
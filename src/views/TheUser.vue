<template>
  <div v-if="currentUser" class="profile-wrapper">
    <div class="profile-card">
      <div class="avatar">{{ currentUser.firstName[0] }}{{ currentUser.lastName[0] }}</div>
      <div class="profile-info">
        <h2>{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
        <p class="username">@{{ currentUser.username }}</p>
        <div class="profile-links">
          <button class="main-btn" @click="goToSiteMap">Карта сайта</button>
        </div>
        <button class="main-btn" @click="handleLogout">Выйти</button>
      </div>
    </div>
    <div class="profile-sections">
      <div class="section">
        <h3>История заказов</h3>
        <div v-if="orderHistory.length > 0" class="orders-list">
          <ul>
            <li v-for="order in orderHistory" :key="order">
              Заказ №{{ order }} от {{ formatDate(order) }}
            </li>
          </ul>
        </div>
        <div v-else class="empty-placeholder">Нет истории заказов</div>
      </div>
      <div class="section">
        <h3>Избранное</h3>
        <div v-if="favorites.length > 0" class="products-grid">
          <div v-for="item in favorites" :key="item.id" class="product-card" @click="goToProduct(item.id)" style="cursor:pointer;">
            <img :src="getImageUrl(item.image)" alt="Product Image" class="product-image" />
            <div class="product-title">{{ item.title }}</div>
            <div class="product-price">{{ item.price }} ₽</div>
            <button class="main-btn" @click.stop="removeFromFavorites(item.id)">Убрать</button>
          </div>
        </div>
        <div v-else class="empty-placeholder">Нет избранных товаров</div>
      </div>
      <div class="section">
        <h3>Корзина</h3>
        <div v-if="cartItems.length > 0" class="cart-items">
          <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
            <img :src="getImageUrl(item.product.image)" alt="Product Image" class="product-image" @click="goToProduct(item.product.id)" />
            <div class="cart-item-info">
              <div class="product-title" @click="goToProduct(item.product.id)">{{ item.product.title }}</div>
              <div class="product-price">{{ item.product.price }} ₽</div>
              <div class="quantity-controls">
                <button class="quantity-btn" @click.stop="decreaseQuantity(item.product.id)">−</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button class="quantity-btn" @click.stop="increaseQuantity(item.product.id)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click.stop="removeFromCart(item.product.id)">×</button>
          </div>
        </div>
        <div v-else class="empty-placeholder">Корзина пуста</div>
        <div v-if="cartItems.length > 0" class="cart-summary">
          <p>Товаров: {{ totalItems }} шт.</p>
          <p>Общая сумма: {{ totalSum }} ₽</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <AuthComponent />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AuthComponent from './AuthComponent.vue';

const store = useStore();
const router = useRouter();
const currentUser = computed(() => store.getters.getCurrentUser);
const favorites = computed(() => store.getters.getFavorites);
const cartItems = computed(() => store.getters.getCartItems);
const totalSum = computed(() => store.getters.cartTotalSum);
const totalItems = computed(() => store.getters.cartTotalItems);
const orderHistory = ref([]);

const formatDate = (dateString: string | number | Date) => new Date(dateString).toLocaleDateString("ru-RU");

function getImageUrl(imagePath: string) {
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

onMounted(() => {
  store.commit('syncAuthState');
  fetchOrderHistory();
});

const handleLogout = () => {
  store.dispatch('logout');
};
const removeFromFavorites = (id: string) => {
  store.dispatch('removeFromFavorites', id);
};
const removeFromCart = (id: string) => {
  store.dispatch('removeFromCart', id);
};
const increaseQuantity = (id: string) => {
  store.dispatch('updateQuantity', { 
    productId: id, 
    quantity: getCurrentQuantity(id) + 1 
  });
};
const decreaseQuantity = (id: string) => {
  store.dispatch('updateQuantity', { 
    productId: id, 
    quantity: getCurrentQuantity(id) - 1 
  });
};

const getCurrentQuantity = (productId: string) => {
  const item = cartItems.value.find((item: { product: { id: string; }; }) => item.product.id === productId);
  return item ? item.quantity : 0;
};

const goToProduct = (id: string) => {
  router.push({ name: 'ProductDetails', params: { id } });
};

const goToSiteMap = () => {
  router.push({ name: 'SiteMap' });
};

async function fetchOrderHistory() {
  const response = await fetch('/api/order-history');
  if (response.ok) {
    const data = await response.json();
    orderHistory.value = data.orders || [];
  } else {
    console.error('Ошибка при загрузке истории заказов:', response.statusText);
  }
}
</script>

<style scoped>
.profile-wrapper {
  max-width: 900px;
  margin: 32px auto;
  padding: 24px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60, 80, 180, 0.07);
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6C8CD5 60%, #3a4ed8 100%);
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.10);
}

.profile-info h2 {
  margin: 0 0 6px 0;
  font-size: 2rem;
}

.username {
  color: #888;
  margin-bottom: 10px;
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
  margin-top: 8px;
}

.main-btn:hover {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}

.profile-sections {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.section {
  flex: 1 1 350px;
  background: #f9f9fb;
  border-radius: 12px;
  padding: 20px 18px 18px 18px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.04);
  min-width: 320px;
}

.section h3 {
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.2rem;
  color: #3a4ed8;
}

.products-grid,
.orders-list ul,
.cart-items {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.orders-list li {
  list-style-type: none;
  margin-bottom: 8px;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.07);
  padding: 12px 10px 16px 10px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.07);
  padding: 12px;
  width: 100%;
  position: relative;
}

.cart-item-info {
  flex-grow: 1;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 6px;
  cursor: pointer;
}

.product-title {
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  margin-bottom: 4px;
}

.product-price {
  color: #3a4ed8;
  font-weight: 600;
  margin-bottom: 8px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
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
  min-width: 24px;
  text-align: center;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
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

.empty-placeholder {
  color: #aaa;
  text-align: center;
  margin: 18px 0 10px 0;
  font-size: 1.05rem;
}

.cart-summary {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.cart-summary p {
  margin: 8px 0;
  font-weight: 600;
}

.cart-summary p:last-child {
  color: #3a4ed8;
  font-size: 1.1rem;
}

.profile-links {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

@media (max-width: 900px) {
  .profile-sections {
    flex-direction: column;
    gap: 18px;
  }
  
  .section {
    min-width: unset;
  }
}

@media (max-width: 600px) {
  .profile-wrapper {
    padding: 8px;
    border-radius: 8px;
  }
  
  .profile-card {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 18px;
  }
  
  .avatar {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }
  
  .profile-info h2 {
    font-size: 1.2rem;
  }
  
  .section {
    padding: 10px 6px 10px 6px;
    border-radius: 8px;
    min-width: unset;
  }
  
  .products-grid,
  .orders-list ul,
  .cart-items {
    gap: 8px;
  }
  
  .product-card {
    padding: 6px 4px 8px 4px;
    width: 100%;
    border-radius: 6px;
    gap: 4px;
  }
  
  .product-image {
    width: 48px;
    height: 48px;
    border-radius: 4px;
  }
  
  .product-title {
    font-size: 0.95rem;
  }
  
  .main-btn {
    font-size: 1em;
    padding: 8px 8px;
    border-radius: 6px;
    margin-top: 4px;
  }
  
  .quantity-btn {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
  
  .quantity {
    min-width: 20px;
  }
}
</style>
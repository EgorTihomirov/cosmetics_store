<template>
  <div v-if="currentUser" class="profile-wrapper">
    <div class="profile-card">
      <div class="avatar">{{ currentUser.firstName[0] }}{{ currentUser.lastName[0] }}</div>
      <div class="profile-info">
        <h2>{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
        <p class="username">@{{ currentUser.username }}</p>
        <button class="main-btn" @click="handleLogout">Выйти</button>
      </div>
    </div>
    <div class="profile-sections">
      <div class="section">
        <h3>Избранное</h3>
        <div v-if="favorites.length > 0" class="products-grid">
          <div v-for="item in favorites" :key="item.id" class="product-card">
            <img :src="getImageUrl(item.image)" alt="Product Image" class="product-image" />
            <div class="product-title">{{ item.title }}</div>
            <div class="product-price">{{ item.price }} ₽</div>
            <button class="main-btn" @click="removeFromFavorites(item.id)">Убрать</button>
          </div>
        </div>
        <div v-else class="empty-placeholder">Нет избранных товаров</div>
      </div>
      <div class="section">
        <h3>Корзина</h3>
        <div v-if="cart.length > 0" class="products-grid">
          <div v-for="item in cart" :key="item.id" class="product-card">
            <img :src="getImageUrl(item.image)" alt="Product Image" class="product-image" />
            <div class="product-title">{{ item.title }}</div>
            <div class="product-price">{{ item.price }} ₽</div>
            <button class="main-btn" @click="removeFromCart(item.id)">Убрать</button>
          </div>
        </div>
        <div v-else class="empty-placeholder">Корзина пуста</div>
        <div v-if="cart.length > 0" class="cart-sum">Сумма: {{ totalSum }} ₽</div>
      </div>
    </div>
  </div>
  <div v-else>
    <AuthComponent />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import AuthComponent from './AuthComponent.vue';

const store = useStore();
const currentUser = computed(() => store.getters.getCurrentUser);
const favorites = computed(() => store.getters.getFavorites);
const cart = computed(() => store.getters.getCart);
const totalSum = computed(() => store.getters.cartTotalSum);

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
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
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
.product-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 6px;
}
.product-title {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: #000;
}
.product-price {
  color: #3a4ed8;
  font-weight: 600;
  margin-bottom: 6px;
  color: #000;
}
.empty-placeholder {
  color: #aaa;
  text-align: center;
  margin: 18px 0 10px 0;
  font-size: 1.05rem;
}
.cart-sum {
  margin-top: 16px;
  font-weight: 600;
  color: #3a4ed8;
  font-size: 1.1rem;
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
  .products-grid {
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
    margin-bottom: 2px;
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
  .cart-sum {
    font-size: 1em;
    margin-top: 8px;
  }
}
</style>
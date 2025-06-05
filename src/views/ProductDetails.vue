<template>
  <div class="product-details">
    <div class="product-image-container">
      <img :src="getImageUrl(product?.image)" alt="Product Image" class="product-image" />
    </div>
    <div class="product-info">
      <h1 style="padding-bottom: 20px;">{{ product?.title }}</h1>
      <p style="padding-bottom: 20px;">Цена: ₽ {{ product?.price }}</p>
      <br>
      <h1 style="padding-bottom: 30px;">Наличие доставки:</h1>
      <p style="padding-bottom: 10px;">Экспресс-доставка ............от 3 часов</p>
      <p style="padding-bottom: 10px;">Курьер ...................................от 3 часов</p>
      <p style="padding-bottom: 70px;">Самовывоз ...........................от 3 часов</p>
      <div class="buttons">
        <button class="main-btn" @click="addToCart">Добавить в корзину</button>
        <button class="main-btn" @click="addToFavorites">Добавить в избранное</button>
      </div>
    </div>
  </div>
  <div class="info">
    <h2>Описание:</h2>
    <p>{{ product?.description }}</p>
  </div>

  <!-- Формы для отзывов -->
  <div class="review-section">
    <div v-if="currentUser">
      <h2>Оставить отзыв:</h2>
      <form class="review-form" @submit.prevent="submitReview">
        <textarea v-model="newReview.comment" rows="4" cols="50" placeholder="Напишите ваш отзыв здесь..."></textarea>
        <select v-model="newReview.rating">
          <option disabled value="">Оценка</option>
          <option value="1">1 звезда</option>
          <option value="2">2 звезды</option>
          <option value="3">3 звезды</option>
          <option value="4">4 звезды</option>
          <option value="5">5 звезд</option>
        </select>
        <button type="submit" class="main-btn">Отправить отзыв</button>
      </form>
      <div v-if="reviewError" class="error-message">{{ reviewError }}</div>
    </div>
    <div v-else>
      <p>Только авторизованные пользователи могут оставлять отзывы.</p>
    </div>
    <!-- Отзывы -->
    <h2>Отзывы:</h2>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <strong>Оценка: {{ review.rating }}/5</strong>
        <span v-if="review.author"> — {{ review.author }}</span>
        <p>{{ review.comment }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const productId = computed(() => route.params.id as string);
const product = computed(() => store.getters.getProductById(productId.value));
const currentUser = computed(() => store.getters.getCurrentUser);
const reviews = computed(() => store.getters.getReviewsForProduct(productId.value));

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

const newReview = ref({
  rating: '',
  comment: ''
});
const reviewError = ref('');

const addToCart = () => {
  if (product.value) {
    store.dispatch('addToCart', product.value);
  }
};
const addToFavorites = () => {
  if (product.value) {
    store.dispatch('addToFavorites', product.value);
  }
};

const submitReview = async () => {
  if (!newReview.value.rating || !newReview.value.comment) {
    reviewError.value = 'Пожалуйста, заполните все поля';
    return;
  }
  const review = {
    id: Date.now().toString(),
    productId: productId.value,
    rating: Number(newReview.value.rating),
    comment: newReview.value.comment
  };
  const result = await store.dispatch('addReview', review);
  if (result.success) {
    newReview.value.rating = '';
    newReview.value.comment = '';
    reviewError.value = '';
  } else {
    reviewError.value = result.message || 'Ошибка отправки отзыва';
  }
};
</script>

<style scoped>
.product-details {
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 32px;
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
  min-width: 320px;
  max-width: 500px;
  width: 100%;
}
.info {
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
.main-btn {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 2px solid #222;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;
}
.main-btn:hover {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}
.review-section {
  margin-top: 30px;
}
.review-form {
  background: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.07);
  padding: 18px 18px 14px 18px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
}
.review-form textarea {
  resize: vertical;
  width: 100%;
  padding: 12px;
  border: 1.5px solid #d0d4e4;
  border-radius: 8px;
  font-size: 1.05rem;
  background: #fff;
  transition: border 0.2s;
  min-height: 70px;
}
.review-form textarea:focus {
  border: 1.5px solid #3a4ed8;
  outline: none;
}
.review-form select {
  padding: 10px;
  border: 1.5px solid #d0d4e4;
  border-radius: 8px;
  font-size: 1.05rem;
  background: #fff;
  transition: border 0.2s;
  width: 100%;
}
.review-form select:focus {
  border: 1.5px solid #3a4ed8;
  outline: none;
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
  margin-top: 6px;
}
.main-btn:hover {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
@media (max-width: 900px) {
  .product-details {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    padding: 8px;
  }
  .product-image-container {
    margin-right: 0;
    margin-bottom: 12px;
    text-align: center;
  }
  .product-image {
    width: 100%;
    max-width: 220px;
    margin: 0 auto;
  }
  .product-info {
    min-width: 160px;
    max-width: 98vw;
    padding: 0 4px;
  }
  .info {
    padding-left: 0;
    margin-top: 10px;
  }
}
@media (max-width: 600px) {
  .product-details {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 0;
  }
  .product-image-container {
    margin-bottom: 4px;
  }
  .product-image {
    width: 100%;
    max-width: 120px;
    min-width: 60px;
    border-radius: 4px;
  }
  .product-info {
    min-width: 60px;
    max-width: 100vw;
    padding: 0 1vw;
    font-size: 0.93em;
  }
  .info {
    padding-left: 0;
    margin-top: 4px;
    font-size: 0.93em;
  }
  .main-btn {
    font-size: 0.95em;
    padding: 6px 6px;
    border-radius: 5px;
    margin-top: 2px;
  }
  .review-section {
    margin-top: 8px;
  }
  .review-form {
    padding: 4px 2px 4px 2px;
    border-radius: 6px;
    font-size: 0.93em;
  }
}
</style>
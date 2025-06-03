<template>
  <div class="registration-form">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <label for="firstName">Имя:</label>
      <input type="text" id="firstName" v-model="formData.firstName" required />

      <label for="lastName">Фамилия:</label>
      <input type="text" id="lastName" v-model="formData.lastName" required />

      <label for="username">Имя пользователя:</label>
      <input type="text" id="username" v-model="formData.username" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="formData.password" required />

      <button type="submit">Зарегистрироваться</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const formData = ref({
  firstName: '',
  lastName: '',
  username: '',
  password: ''
});
const errorMessage = ref('');

const handleRegister = async () => {
  const result = await store.dispatch('register', formData.value);
  if (result.success) {
    router.push('/cosmetics_store/account');
  } else {
    errorMessage.value = result.message || 'Ошибка регистрации';
  }
};
</script>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: 40px auto;
  padding: 32px 28px 24px 28px;
  border: 1px solid #eee;
  border-radius: 18px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 24px rgba(60, 80, 180, 0.07);
}

.registration-form h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 2rem;
  color: #222;
  font-weight: 700;
}

form label {
  display: block;
  margin-bottom: 5px;
  color: #444;
  font-weight: 500;
}

form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 18px;
  border: 1.5px solid #d0d4e4;
  border-radius: 8px;
  font-size: 1.05rem;
  background: #fff;
  transition: border 0.2s;
  box-sizing: border-box;
}

form input:focus {
  border: 1.5px solid #3a4ed8;
  outline: none;
}

form button {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 2px solid #222;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 6px;
  width: 100%;
  font-weight: 600;
}

form button:hover {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 600px) {
  .registration-form {
    max-width: 98vw;
    padding: 16px 4px 12px 4px;
    border-radius: 10px;
  }
  .registration-form h2 {
    font-size: 1.2rem;
    margin-bottom: 14px;
  }
  form input {
    font-size: 1em;
    padding: 10px;
    margin-bottom: 12px;
    border-radius: 6px;
  }
  form button {
    font-size: 1em;
    padding: 10px 8px;
    border-radius: 6px;
  }
}
</style>
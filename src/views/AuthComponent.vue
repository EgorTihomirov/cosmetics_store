<template>
  <div class="auth-component">
    <h2>Вам необходимо войти или зарегистрироваться</h2>
    <button @click="redirectToLogin">Войти</button>
    <button @click="redirectToRegister">Зарегистрироваться</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthComponent',
  setup() {
    const router = useRouter()

    const redirectToLogin = () => {
      router.push('/cosmetics_store/log')
    }

    const redirectToRegister = () => {
      router.push('/cosmetics_store/reg')
    }

    return {
      redirectToLogin,
      redirectToRegister
    }
  }
})
</script>

<style scoped>
.auth-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 400px;
  margin: 0 auto;
}

button {
  margin: 10px;
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 2px solid #222;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  border: 2px solid #3a4ed8;
  color: #3a4ed8;
  background: #f4f7ff;
}

@media (max-width: 600px) {
  .auth-component {
    max-width: 98vw;
    padding: 16px 4px 12px 4px;
    border-radius: 10px;
  }
  h2 {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  button {
    font-size: 1em;
    padding: 10px 8px;
    border-radius: 6px;
  }
}
</style>
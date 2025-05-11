<template>
  <article class="card">
    <img :src="product.img" :alt="product.title" class="card__img" />

    <h4 class="card__title">{{ product.title }}</h4>
    <p  class="card__price">{{ product.price.toLocaleString() }} $</p>

    <BaseButton class="card__btn">Подробнее</BaseButton>
  </article>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
//defineProps({ product:Object })
</script>

<style scoped>
.card{
  width:449px; border:1px solid #757575; background:#fff; padding:20px;
  display:flex; flex-direction:column; align-items:center; gap:12px;

  &__img  { width:100%; height:334px; object-fit:cover; }
  &__title{ text-align:center; font:400 14px 'Montserrat',sans-serif; }
  &__price{ font:400 14px 'Montserrat',sans-serif; }
  &__btn  { width:194px; }
}
</style>
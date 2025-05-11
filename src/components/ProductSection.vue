<template>
  <section class="productSection">
    <h3 class="productSection__title">{{ title }}</h3>

    <div class="productSection__list">
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'
//defineProps({ title:String, products:Array })
</script>

<style scoped>
.productSection{
  max-width:1920px; margin: 90px auto;

  &__title{ text-align:center; font:500 32px; margin-bottom:30px; }

  &__list{
    display:flex; gap:20px; overflow-x:auto; padding-inline:10px;
  }
}
</style>
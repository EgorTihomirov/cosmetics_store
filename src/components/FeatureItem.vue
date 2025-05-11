<template>
  <div class="feature">
    <img :src="`/icons/${item.icon}`" alt="" class="feature__icon" />
    <span class="feature__label" v-html="item.label"/>
  </div>
</template>

<script setup>
//defineProps({ item:Object })
</script>

<style scoped>
.feature{
  display:flex; flex-direction:column; align-items:center; text-align:center;
  &__icon  { width:68px; height:68px; margin-bottom:12px; }
  &__label { font:400 24px/1.2 ; white-space:pre-line; }
}
</style>
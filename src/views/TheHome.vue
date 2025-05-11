<template>
  <!-- HERO -------------------------------------------------------------->
  <section class="hero">
    <img class="hero__image" :src="hero.img" alt="Hero" />
    <div class="hero__titles">
      <h1 class="hero__title">{{ hero.title }}</h1>
      <h2 class="hero__subtitle">{{ hero.subtitle }}</h2>
      <p class="hero__text" v-html="hero.text" />
      <BaseButton>{{ hero.btnText }}</BaseButton>
    </div>
  </section>

  <!-- FEATURES ---------------------------------------------------------->
  <section class="features">
    <FeatureItem v-for="f in features" :key="f.label" :item="f" />
  </section>

  <!-- NEW PRODUCTS ------------------------------------------------------>
  <ProductSection
    title="Новинки"
    :products="newProducts"
  />

  <!-- POPULAR PRODUCTS -------------------------------------------------->
  <ProductSection
    title="Популярное"
    :products="popularProducts"
  />

  <!-- BANNER GRID ------------------------------------------------------->
  <section class="banners">
    <img v-for="(b, i) in banners" :key="i" :src="b" class="banners__item" />
  </section>
</template>

<script setup>
/* ---------- ДАННЫЕ --------------------------------------------------- */
import FeatureItem     from '@/components/FeatureItem.vue'
import ProductSection  from '@/components/ProductSection.vue'
import BaseButton      from '@/components/BaseButton.vue'

const hero = {
  img:       '/images/hero.jpg',
  title:     'НОВАЯ КОЛЛЕКЦИЯ',
  subtitle:  'Innisfree',
  text:      `Innisfree&nbsp;- это южнокорейская марка косметики,
              которая ориентируется на натурализм и позиционирует себя
              как полностью экологичный бренд. Название вдохновлено
              стихотворением У.&nbsp;Йейтса «Озерный остров Иннисфри».`,
  btnText:   'Смотреть'
}

const features = [
  { icon: 'truck.svg',   label: 'Быстрая доставка'   },
  { icon: 'box.svg',     label: 'Широкий ассортимент'},
  { icon: 'leaf.svg',    label: 'Качественная\nкосметика' },
  { icon: 'star.svg',    label: 'Популярные бренды' }
]

const newProducts = [
  {
    id: 1,
    img: '/images/products/1.jpg',
    title: 'Innisfree Vita C Green Tea Brightening Pad',
    price: 2344
  },
  // ...ещё товары
]

const popularProducts = [
  {
    id: 11,
    img: '/images/products/11.jpg',
    title: 'Innisfree Super Volcanic Pore Clay Mask',
    price: 1890
  },
  // ...
]

const banners = [
  '/images/banners/1.jpg',
  '/images/banners/2.jpg',
  '/images/banners/3.jpg',
  '/images/banners/4.jpg'
]
</script>

<style scoped lang="scss">
/* базовые переменные → можно вынести в отдельный файл */
$font-main: 'Montserrat', sans-serif;
$dark:      #000;
$accent:    #6C8CD5;

/* HERO */
.hero {
  position: relative;
  display: flex;
  max-width: 1880px;
  height: 896px;
  overflow: hidden;
  border-inline: 2px solid $dark;

  &__image   { width: 50%; object-fit: cover; }
  &__titles  {
    width: 50%; padding: 80px 100px;
    display: flex; flex-direction: column; gap: 32px;
  }
  &__title   { font: 400 96px/1 'Roboto', sans-serif; }
  &__subtitle{ font: 200 64px/1 'Roboto', sans-serif; }
  &__text    { font: 400 24px/1.3 'Montserrat Alternates', sans-serif; }
}

/* FEATURES */
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1880px;
  height: 200px;
  place-items: center;
}

/* BANNERS */
.banners {
  display: grid;
  grid-template-areas:
    "big big rightTop"
    "big big rightBottom";
  gap: 20px;
  max-width: 1880px;
  height: 750px;

  &__item {
    width: 100%; height: 100%; object-fit: cover;

    &:nth-child(1) { grid-area: big; }
    &:nth-child(2) { grid-area: rightTop; }
    &:nth-child(3) { grid-area: rightBottom; }
    &:nth-child(4) { grid-area: rightBottom; }
  }
}
</style>
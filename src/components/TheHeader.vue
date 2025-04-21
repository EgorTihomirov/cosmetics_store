<template>
  
<div>
    <section class="hero">
      <div class="hero__img"></div>
      <h1 class="hero__subtitle">НОВАЯ КОЛЛЕКЦИЯ</h1>
      <h2 class="hero__title">Innisfree</h2>
      <p class="hero__text">
        Innisfree — южнокорейская марка косметики, которая ориентируется на
        натурализм и позиционирует себя как полностью экологичный бренд.
        Название вдохновлено стихотворением У. Йейтса «Озерный остров
        Иннисфри», где поэтично описывается природа острова, полная покоя
        и волшебной красоты.
      </p>
      <a href="#" class="btn hero__btn">
        Смотреть
        <span class="btn__arrow"></span>
      </a>
    </section>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default defineComponent({
  setup() {
    const products = ref<Product[]>([]);

    onMounted(async () => {
      try {
        // const response = await axios.get('/api/products');
        // products.value = response.data;

        // используем мок-данные
        products.value = [
          {
            id: 1,
            name: "Крем для лица",
            description: "Увлажняющий крем для лица с экстрактом алоэ.",
            price: 19.99
          },
          {
            id: 2,
            name: "Тональный крем",
            description: "Тональный крем с SPF 30.",
            price: 24.99
          },
          {
            id: 3,
            name: "Бальзам для губ",
            description: "Бальзам для губ с витамином Е.",
            price: 7.99
          }
        ];
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    });

    return {
      products
    };
  }
});
</script>

<style>
*       { box-sizing: border-box; margin: 0; padding: 0; }
body    { font-family: 'Roboto', sans-serif; background:#fff; }
.page   { width:100%; position: relative; }



.hero {
  position:fixed; width:80%; height:20%;
  justify-content: center;
}
.hero__img {
  position:absolute; top:0; right:0;
  width:926px; height:896px;
  background:url("/src/assets/v268_1027.png") center/cover no-repeat;
}

.hero__subtitle {
  position:absolute; top:0; left:479px; width:920px;
  font:96px 'Roboto',sans-serif; text-align:center;
}
.hero__title {
  position:absolute; top:99px; left:820px; width:240px;
  font:64px 200 'Roboto',sans-serif; text-align:center;
}
.hero__text {
  position:absolute; top:321px; left:95px; width:633px;
  font-size:24px; line-height:1.35;
}

.btn {
  display:inline-flex; align-items:center; gap:10px;
  text-decoration:none; color:#000;
  font:24px 'Montserrat',sans-serif;
}
.hero__btn {
  position:absolute; top:747px; left:288px;
  width:247px; height:77px; padding:0 30px;
  background:#6c8cd5; border-radius:38px;
}
.btn__arrow {
  width:30px; height:2px; background:#000; position:relative;
}
.btn__arrow::after {
  content:''; position:absolute; right:0; top:-8px;
  border:9px solid transparent; border-left:12px solid #000;
}

.features {
  position:relative; top:1196px; left:20px;
  width:calc(100% - 40px); height:200px;
  background:#c7c7c7; display:flex; gap:20px; padding:18px 0;
}
.feature-card {
  flex:0 0 455px; height:163px;
  background:#d7d3d3; display:flex; align-items:center; justify-content:center;
  position:relative;
}
.feature-card__icon {
  position:absolute; top:0; left:0;
  width:82px; height:82px; background:#fff;
}
.feature-card__icon::after {
  content:''; display:block; width:68px; height:61px;
  background:#000; margin:10px 6px;
}
.feature-card__title {
  font:24px 'Montserrat',sans-serif; text-align:center; max-width:208px;
}

</style>
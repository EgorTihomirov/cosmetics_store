<template>
  <div class="product-card">
    <img :src="getImageUrl(image)" alt="Product Image" class="product-image" />
    <h2 class="product-title">{{ title }}</h2>
    <p class="product-price">₽ {{ price }}</p>
    <button class="details-button" @click="onDetailsClick">Подробнее</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    onDetailsClick() {
      this.$router.push({ name: 'ProductDetails', params: { id: this.id } });
    },
    addToCart() {
      this.$store.dispatch('addToCart', {
        id: this.id,
        title: this.title,
        image: this.image,
        price: this.price
      });
    },
    addToFavorites() {
      this.$store.dispatch('addToFavorites', {
        id: this.id,
        title: this.title,
        image: this.image,
        price: this.price
      });
    },
    getImageUrl(imagePath) {
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
  }
}
</script>

<style scoped>
.product-card {
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 50%;
  object-fit: contain;
  border-radius: 4px;
}

.product-title {
  font-size: 1.5em;
  margin: 10px 0 0;
  text-align: center;
}

.product-price {
  font-size: 1.4em;
  color: black;
  font-weight: bold;
  margin: 0;
}

.details-button {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-button:hover {
  border: 2px solid black;
  background-color: white;
}
</style>
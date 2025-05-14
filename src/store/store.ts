import { createStore } from 'vuex';
import { Product } from './types';

export default createStore({
  state: {
    products: [
      {
        id: '1',
        title: 'Крем для рук Inisfree',
        image: '../assets/крем.svg',
        price: '₽ 1500',
        description: 'Этот крем для рук создан специально для заботы о вашей коже в любое время года. Он содержит натуральные масла и экстракты, которые глубоко увлажняют и питают кожу, делая её мягкой и шелковистой. Крем быстро впитывается, не оставляя жирного блеска, и защищает руки от воздействия окружающей среды. Подходит для ежедневного использования, особенно в холодное время года, когда кожа нуждается в дополнительной защите.'
      },
      {
        id: '2',
        title: 'крем для лица Inisfree',
        image: '../assets/крем.svg',
        price: '₽ 4670',
        description: 'Это ваш идеальный помощник в уходе за кожей. Он содержит комплекс витаминов и антиоксидантов, которые помогают улучшить цвет лица и придают коже здоровый и сияющий вид. Крем эффективно увлажняет и питает кожу, уменьшая признаки усталости и стресса. Подходит для всех типов кожи, особенно для тех, кто хочет добиться ровного и свежего тона лица.'
      },
      {
        id: '3',
        title: 'крем для тела Inisfree',
        image: '../assets/крем.svg',
        price: '₽ 2340',
        description: ' Это настоящее удовольствие для вашей кожи. Он содержит натуральные масла и экстракты, которые глубоко увлажняют и питают кожу, делая её мягкой и бархатистой. Крем быстро впитывается, не оставляя жирного блеска, и дарит ощущение комфорта и расслабления. Подходит для ежедневного использования, особенно после душа или ванны, когда кожа нуждается в дополнительном уходе.'
      },
    ] as Product[],
    cart: [] as Product[],
    favorites: [] as Product[]
  },
  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.id === id);
    },
    getAllProducts: (state) => {
      return state.products;
    },
    getCart: (state) => {
      return state.cart;
    },
    getFavorites: (state) => {
      return state.favorites;
    }
  },
  mutations: {
    addToCart(state, product: Product) {
      state.cart.push(product);
    },
    addToFavorites(state, product: Product) {
      state.favorites.push(product);
    }
  },
  actions: {
    addToCart({ commit }, product: Product) {
      commit('addToCart', product);
    },
    addToFavorites({ commit }, product: Product) {
      commit('addToFavorites', product);
    }
  }
});
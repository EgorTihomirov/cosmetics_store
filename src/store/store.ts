import { createStore, Commit } from 'vuex';
import { Product, Review, User, State } from './types';

function loadUsers(): User[] {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}
function saveUsers(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users));
}
function loadCurrentUser(): User | null {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}
function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
}
function loadReviews(): Review[] {
  const reviews = localStorage.getItem('reviews');
  return reviews ? JSON.parse(reviews) : [];
}
function saveReviews(reviews: Review[]) {
  localStorage.setItem('reviews', JSON.stringify(reviews));
}
function loadCart(): Product[] {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
function saveCart(cart: Product[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function loadFavorites(): Product[] {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}
function saveFavorites(favorites: Product[]) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

const initialState: State = {
  products: [
    {
      id: '1',
      title: 'Крем для рук Inisfree',
      image: '../assets/img_product/крем.svg',
      price: 1500,
      description: 'Этот крем для рук создан специально для заботы о вашей коже в любое время года. Он содержит натуральные масла и экстракты, которые глубоко увлажняют и питают кожу, делая её мягкой и шелковистой. Крем быстро впитывается, не оставляя жирного блеска, и защищает руки от воздействия окружающей среды. Подходит для ежедневного использования, особенно в холодное время года, когда кожа нуждается в дополнительной защите.',
      category: 'Уход за кожей'
    },
    {
      id: '2',
      title: 'крем для лица Inisfree',
      image: '../assets/img_product/крем.svg',
      price: 4670,
      description: 'Это ваш идеальный помощник в уходе за кожей. Он содержит комплекс витаминов и антиоксидантов, которые помогают улучшить цвет лица и придают коже здоровый и сияющий вид. Крем эффективно увлажняет и питает кожу, уменьшая признаки усталости и стресса. Подходит для всех типов кожи, особенно для тех, кто хочет добиться ровного и свежего тона лица.',
      category: 'Уход за кожей'
    },
    {
      id: '3',
      title: 'крем для тела Inisfree',
      image: '../assets/img_product/крем.svg',
      price: 2340,
      description: ' Это настоящее удовольствие для вашей кожи. Он содержит натуральные масла и экстракты, которые глубоко увлажняют и питают кожу, делая её мягкой и бархатистой. Крем быстро впитывается, не оставляя жирного блеска, и дарит ощущение комфорта и расслабления. Подходит для ежедневного использования, особенно после душа или ванны, когда кожа нуждается в дополнительном уходе.',
      category: 'Уход за кожей'
    },
    {
      id: '4',
      title: 'Ватные диски',
      image: '../assets/img_product/диски.png',
      price: 540,
      description: 'Ватные диски — это универсальный продукт для ухода за кожей лица. Они изготовлены из мягкого хлопка и идеально подходят для снятия макияжа, нанесения тоников и масок. Ватные диски впитывающие и удобные в использовании, что делает их незаменимыми в ежедневном уходе за кожей.',
      category: 'Личная гигиена'
    },
    {
      id: '5',
      title: 'Зубная паста Inisfree',
      image: '../assets/img_product/паста.jpg',
      price: 700,
      description: 'Зубная паста — это продукт для ежедневного ухода за полостью рта. Она содержит фторид, который помогает укреплять зубную эмаль и предотвращать кариес. Паста эффективно удаляет налет и освежает дыхание, обеспечивая здоровье и красоту ваших зубов. Подходит для всех членов семьи.',
      category: 'Личная гигиена'
    },
    {
      id: '6',
      title: 'Дезодорант Inisfree',
      image: '../assets/img_product/дез.jpg',
      price: 900,
      description: 'Это продукт для ежедневного ухода за телом, который помогает нейтрализовать неприятные запахи и обеспечивает ощущение свежести на протяжении всего дня. Он содержит натуральные компоненты, которые предотвращают размножение бактерий и обеспечивают защиту от пота. Дезодорант не содержит спирта и подходит для всех типов кожи, включая чувствительную. Он легко наносится и быстро впитывается, не оставляя следов на одежде.',
      category: 'Личная гигиена'
    },
    {
      id: '7',
      title: 'Влажные салфетки',
      image: '../assets/img_product/салфетки.jpg',
      price: 300,
      description: 'Влажные салфетки — это удобный и гигиеничный продукт для ухода за кожей. Они пропитаны мягким очищающим раствором, который эффективно удаляет загрязнения и освежает кожу. Салфетки идеально подходят для использования в дороге, на работе или дома. Они не содержат спирта и подходят для всех типов кожи.',
      category: 'Личная гигиена'
    },
    {
      id: '8',
      title: 'Икена ватные палочки',
      image: '../assets/img_product/палочки.jpg',
      price: 69,
      description: 'Икена ватные палочки гигиенические — это удобный и безопасный продукт для ухода за ушами и другими труднодоступными местами. Они изготовлены из высококачественного хлопка и имеют прочную пластиковую основу, что обеспечивает комфортное и эффективное использование. Ватные палочки идеально подходят для ежедневной гигиены и ухода за кожей.',
      category: 'Личная гигиена'
    },
    {
      id: '9',
      title: 'Икена ватные диски',
      image: '../assets/img_product/икена.jpg',
      price: 139,
      description: 'Икена ватные диски косметические — это универсальный продукт для ухода за кожей лица. Они изготовлены из высококачественного хлопка и идеально подходят для снятия макияжа, нанесения тоников и масок. Ватные диски мягкие и впитывающие, что обеспечивает комфортное и эффективное использование. Они идеально подходят для ежедневного ухода за кожей.',
      category: 'Личная гигиена'
    },
    {
      id: '10',
      title: 'Эпиген интим гель',
      image: '../assets/img_product/гель.jpg',
      price: 1779,
      description: 'Эпиген интим гель — это деликатный продукт для ежедневного ухода за интимной зоной. Он содержит натуральные компоненты, которые помогают поддерживать естественный баланс микрофлоры и защищают от раздражений. Гель мягко очищает и увлажняет кожу, обеспечивая ощущение свежести и комфорта на протяжении всего дня. Подходит для всех типов кожи, включая чувствительную.',
      category: 'Личная гигиена'
    },
    {
      id: '11',
      title: 'Гель восстанавливающий',
      image: '../assets/img_product/древо.jpg',
      price: 555,
      description: 'Гинокомфорт гель с экстрактом чайного дерева — это восстанавливающий продукт для интимной гигиены. Он помогает поддерживать здоровье и комфорт интимной зоны, благодаря своим антисептическим и противовоспалительным свойствам. Гель эффективно устраняет неприятные ощущения и способствует быстрому восстановлению кожи. Подходит для ежедневного использования и особенно рекомендуется при повышенной чувствительности.',
      category: 'Личная гигиена'
    },
  ] as Product[],
  cart: loadCart(),
  favorites: loadFavorites(),
  users: loadUsers(),
  reviews: loadReviews(),
  currentUser: loadCurrentUser(),
};

export default createStore<State>({
  state: initialState,
  getters: {
    getCurrentUser(state): User | null {
      return state.currentUser;
    },
    usersCount(state): number {
      return state.users.length;
    },
    getUserByUsername: (state) => (username: string): User | undefined => {
      return state.users.find((u) => u.username === username);
    },
    getProductById: (state) => (id: string): Product | undefined => {
      return state.products.find(product => product.id === id);
    },
    getAllProducts: (state): Product[] => {
      return state.products;
    },
    getCart: (state): Product[] => state.cart,
    getFavorites: (state): Product[] => state.favorites,
    getReviewsForProduct: (state) => (productId: string): Review[] => {
      return state.reviews.filter(review => review.productId === productId);
    },
    cartTotalSum: (state): number => state.cart.reduce((sum, item) => sum + Number(item.price), 0),
  },
  mutations: {
    setUsers(state, users: User[]) {
      state.users = users;
      saveUsers(users);
    },
    setCurrentUser(state, user: User | null) {
      state.currentUser = user;
      saveCurrentUser(user);
    },
    addReview(state, review: Review) {
      state.reviews.push(review);
      saveReviews(state.reviews);
    },
    syncAuthState(state) {
      state.users = loadUsers();
      state.currentUser = loadCurrentUser();
    },
    setCart(state, cart: Product[]) {
      state.cart = cart;
      saveCart(cart);
    },
    setFavorites(state, favorites: Product[]) {
      state.favorites = favorites;
      saveFavorites(favorites);
    },
    addToCart(state, product: Product) {
      if (!state.cart.find(item => item.id === product.id)) {
        state.cart.push(product);
        saveCart(state.cart);
      }
    },
    removeFromCart(state, productId: string) {
      state.cart = state.cart.filter(item => item.id !== productId);
      saveCart(state.cart);
    },
    addToFavorites(state, product: Product) {
      if (!state.favorites.find(item => item.id === product.id)) {
        state.favorites.push(product);
        saveFavorites(state.favorites);
      }
    },
    removeFromFavorites(state, productId: string) {
      state.favorites = state.favorites.filter(item => item.id !== productId);
      saveFavorites(state.favorites);
    },
  },
  actions: {
    async register({ state, commit }, user: User) {
      if (state.users.some((u) => u.username === user.username)) {
        return { success: false, message: 'Пользователь с таким именем уже существует' };
      }
      const newUser: User = { ...user, id: Date.now().toString() };
      const users: User[] = [...state.users, newUser];
      commit('setUsers', users);
      commit('setCurrentUser', newUser);
      return { success: true };
    },
    async login({ state, commit }, { username, password }: { username: string; password: string }) {
      const user = state.users.find((u) => u.username === username && u.password === password);
      if (!user) {
        return { success: false, message: 'Неверный логин или пароль' };
      }
      commit('setCurrentUser', user);
      return { success: true };
    },
    logout({ commit }) {
      commit('setCurrentUser', null);
    },
    addReview({ commit, state }, review: Review) {
      if (!state.currentUser) {
        return { success: false, message: 'Только авторизованные пользователи могут оставлять отзывы' };
      }
      const reviewWithAuthor: Review = {
        ...review,
        author: state.currentUser.username
      };
      commit('addReview', reviewWithAuthor);
      return { success: true };
    },
    addToCart({ commit, state }, product: Product) {
      if (!state.cart.find(item => item.id === product.id)) {
        commit('addToCart', product);
      }
    },
    removeFromCart({ commit }, productId: string) {
      commit('removeFromCart', productId);
    },
    addToFavorites({ commit, state }, product: Product) {
      if (!state.favorites.find(item => item.id === product.id)) {
        commit('addToFavorites', product);
      }
    },
    removeFromFavorites({ commit }, productId: string) {
      commit('removeFromFavorites', productId);
    },
  }
});
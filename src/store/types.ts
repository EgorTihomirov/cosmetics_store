export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  composition?: string; // Новое необязательное поле
}
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: 'admin' | 'customer';
}

interface CartItem {
  product: Product;
  quantity: number;
}
export interface State {
  products: Product[];
  cart: Product[];
  favorites: Product[];
  users: User[];
  reviews: Review[];
  currentUser: User | null;
  CartItem: CartItem[];
}
export interface Getters {
  getProductById: (state: State) => (id: string) => Product | undefined;
  getAllProducts: (state: State) => Product[];
  getCart: (state: State) => Product[];
  getFavorites: (state: State) => Product[];
  getUserById: (state: State) => (id: string) => User | undefined;
  getReviewsForProduct: (state: State) => (productId: string) => Review[];
}
export interface Mutations {
  addToCart: (state: State, product: Product) => void;
  addToFavorites: (state: State, product: Product) => void;
  addUser: (state: State, user: User) => void;
  addReview: (state: State, review: Review) => void;
}
export interface Actions {
  addToCart: (
    context: { commit: (type: string, product: Product) => void },
    product: Product
  ) => void;
  addToFavorites: (
    context: { commit: (type: string, product: Product) => void },
    product: Product
  ) => void;
  addUser: (
    context: { commit: (type: string, user: User) => void },
    user: User
  ) => void;
  addReview: (
    context: { commit: (type: string, review: Review) => void },
    review: Review
  ) => void;
}
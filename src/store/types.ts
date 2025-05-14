export interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  description: string;
}

export interface State {
  products: Product[];
  cart: Product[];
  favorites: Product[];
}

export interface Getters {
  getProductById: (state: State) => (id: string) => Product | undefined;
  getAllProducts: (state: State) => Product[];
  getCart: (state: State) => Product[];
  getFavorites: (state: State) => Product[];
}

export interface Mutations {
  addToCart: (state: State, product: Product) => void;
  addToFavorites: (state: State, product: Product) => void;
}

export interface Actions {
  addToCart: (context: { commit: (type: string, product: Product) => void }, product: Product) => void;
  addToFavorites: (context: { commit: (type: string, product: Product) => void }, product: Product) => void;
}
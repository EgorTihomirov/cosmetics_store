// Тип данных для карточки товара
//позже более подробно описать
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// типо данные
const mockProducts: Product[] = [
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
export enum Storagekey {
  SelectedProductTitle = "selectedProductTitle"
}
export interface Product {
  productName: string;
  models: ProductModal[];

}
export interface ProductModal {
  id: number
  price: number;
  description: string;
  variant?: string;
  image: string;
  category: string;
}

export enum ProductTypeEnum {
  Accessories = 'Accessories',
  Products = 'Products',
  Spearpart = 'Spearpart',

}

export interface ProductCategory {
  category: ProductTypeEnum;
  products: Product[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    category: ProductTypeEnum.Accessories,
    products: [
      {
        productName: 'Headphone',
        models: [
          { id: 1, category: 'Headphone', price: 150, description: 'Wired headphone', image: 'headphone1.jpg' },
          { id: 2, category: 'Headphone', price: 180, description: 'Wireless headphone', image: 'headphone2.jpg' },
          { id: 3, category: 'Headphone', price: 220, description: 'Noise-cancelling headphone', image: 'headphone3.jpg' }
        ]
      },
      {
        productName: 'Charger',
        models: [
          { id: 4, category: 'Charger', price: 200, description: 'Type-C charger', image: 'charger1.jpg' },
          { id: 5, category: 'Charger', price: 250, description: 'Fast charger', image: 'charger2.jpg' }
        ]
      },
      {
        productName: 'Data Cable',
        models: [
          { id: 6, category: 'Data Cable', price: 100, description: 'Type-C cable', image: 'cable1.jpg' },
          { id: 7, category: 'Data Cable', price: 120, description: 'V8 cable', image: 'cable2.jpg' }
        ]
      },
      {
        productName: 'Glass',
        models: [
          { id: 8, category: 'Glass', price: 80, description: '11D Tempered Glass', image: 'glass1.jpg' }
        ]
      },
      {
        productName: 'Nackband',
        models: [
          { id: 9, category: 'Nackband', price: 400, description: 'Wireless neckband', image: 'nackband1.jpg' }
        ]
      },
      {
        productName: 'Cover',
        models: [
          { id: 10, category: 'Cover', price: 120, description: 'All model covers', image: 'cover1.jpg' }
        ]
      }
    ]
  },
  {
    category: ProductTypeEnum.Products,
    products: [
      {
        productName: 'iPhone 14',
        models: [
          { id: 11, category: 'Products', price: 70000, description: '128GB, Blue', image: 'iphone14.jpg' }
        ]
      },
      {
        productName: 'Samsung S23',
        models: [
          { id: 12, category: 'Products', price: 60000, description: '256GB, Black', image: 'samsung.jpg' }
        ]
      }
    ]
  }
];

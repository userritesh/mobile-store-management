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
          { id: 1, category: 'Headphone', price: 150, description: 'Wired headphone', image: 'assets/img_icon/CARPRIE-Universal-3-5mm.jpg' },
          { id: 2, category: 'Headphone', price: 180, description: 'Wireless headphone', image: 'assets/img_icon/wired_earphone.webp' },
          { id: 3, category: 'Headphone', price: 220, description: 'Noise-cancelling headphone', image: 'assets/img_icon/liting_type_earphone.webp' },
          { id: 4, category: 'Headphone', price: 999, description: 'Noise-cancelling headphone', image: 'assets/img_icon/wireless_mivi.jpg' },
          { id: 5, category: 'Headphone', price: 1199, description: 'Noise-cancelling headphone', image: 'assets/img_icon/head_set_noice.jpg' },
          { id: 6, category: 'Headphone', price: 1999, description: 'Noise-cancelling headphone', image: 'assets/img_icon/boAt_buird.jpg' },
        ]
      },
      {
        productName: 'Charger',
        models: [
          { id: 4, category: 'Charger', price: 1500, description: 'Type-C charger', image: 'assets/img_icon/nothing.avif' },
          { id: 6, category: 'Charger', price: 1200, description: 'One Plus charger', image: 'assets/img_icon/1+_charger.jpg' },
          { id: 7, category: 'Charger', price: 1800, description: 'samsung c to c', image: 'assets/img_icon/samsung_c_to_c.jpg' },
          { id: 8, category: 'Charger', price: 4000, description: 'c to liting', image: 'assets/img_icon/c_to_liting.jpg' },
          { id: 9, category: 'Charger', price: 250, description: 'Fast car charger', image: 'assets/img_icon/car_charger.jpg' },
          { id: 10, category: 'Charger', price: 1999, description: 'Fast xiaomi charger', image: 'assets/img_icon/xiaomi_charger.jpg' },
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

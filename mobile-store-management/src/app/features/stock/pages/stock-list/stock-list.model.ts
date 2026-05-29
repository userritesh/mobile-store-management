/**
 * Stock List Models & Interfaces
 * 
 * This file contains all TypeScript interfaces used in the Stock List component.
 * Organizing models in a separate file follows Angular best practices:
 * - Improves code organization and maintainability
 * - Enables model reuse across multiple components
 * - Keeps components focused on logic rather than type definitions
 * - Makes testing easier by isolating data structures
 */

/**
 * Product interface for type safety
 * Represents a product item in the inventory/Point of Sale system
 * 
 * @interface Product
 * @property {number | string} id - Unique product identifier
 * @property {string} name - Product name/title
 * @property {number} price - Product price in USD
 * @property {string} category - Product category classification
 * @property {number} stock - Available inventory count
 * @property {string} [image] - Optional product image URL or path
 * @property {number} [quantity] - Optional quantity in shopping cart
 */
export interface Product {
  id: number | string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  quantity?: number;
}

/**
 * Stock category interface for type safety
 * Represents a category that groups related products
 * 
 * @interface StockCategory
 * @property {string} stockcategory - Category name/identifier
 * @property {string} icon_img - URL/path to category icon image
 * @property {any} [key: string] - Additional flexible properties for API responses
 */
export interface StockCategory {
  stockcategory: string;
  icon_img: string;
  [key: string]: any;
}

/**
 * API Response interface for type safety
 * Represents standardized API response structure from backend
 * Used for all API calls to maintain consistency
 * 
 * @interface ApiResponse
 * @property {boolean} isSuccess - Indicates if API call was successful
 * @property {string} [message] - Optional response message (error or success detail)
 * @property {any} [key: string] - Additional flexible properties for API data
 */
export interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  [key: string]: any;
}

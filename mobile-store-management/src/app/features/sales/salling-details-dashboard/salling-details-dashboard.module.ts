import { GridModel } from 'src/app/shared/components/grid/grid-model.model';

export const sellingItemsGrid: GridModel = {
  colDefs: [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, },
    { field: 'category', headerName: 'Category', sortable: true, filter: true, },
    { field: 'itemName', headerName: 'Item Name', sortable: true, filter: true, },
    { field: 'brand', headerName: 'Brand', sortable: true, filter: true, },
    { field: 'quantity', headerName: 'Quantity', sortable: true, filter: true, },
    { field: 'unitPrice', headerName: 'Unit Price', sortable: true, filter: true, },
    { field: 'totalPrice', headerName: 'Total Price', sortable: true, filter: true, }
  ],

  rowData: [
    // 🔹 PhonesS
    { id: 1, category: 'Phones', itemName: 'iPhone 15', brand: 'Apple', quantity: 2, unitPrice: 1200, totalPrice: 2400 },
    { id: 2, category: 'Phones', itemName: 'Samsung S23', brand: 'Samsung', quantity: 3, unitPrice: 999, totalPrice: 2997 },
    { id: 3, category: 'Phones', itemName: 'OnePlus 12', brand: 'OnePlus', quantity: 1, unitPrice: 799, totalPrice: 799 },
    { id: 4, category: 'Phones', itemName: 'Xiaomi 14', brand: 'Xiaomi', quantity: 5, unitPrice: 499, totalPrice: 2495 },
    // 🔹 ACCESSORIES
    { id: 5, category: 'Accessory', itemName: 'Charger 65W', brand: 'Samsung', quantity: 10, unitPrice: 25, totalPrice: 250 },
    { id: 6, category: 'Accessory', itemName: 'AirPods Pro', brand: 'Apple', quantity: 4, unitPrice: 249, totalPrice: 996 },
    { id: 7, category: 'Accessory', itemName: 'Phone Case', brand: 'Spigen', quantity: 15, unitPrice: 20, totalPrice: 300 },
    { id: 8, category: 'Accessory', itemName: 'USB-C Cable', brand: 'Anker', quantity: 25, unitPrice: 15, totalPrice: 375 },
    // 🔹 TABLETS
    { id: 9, category: 'Tablet', itemName: 'iPad Pro', brand: 'Apple', quantity: 2, unitPrice: 1099, totalPrice: 2198 },
    { id: 10, category: 'Tablet', itemName: 'Galaxy Tab S9', brand: 'Samsung', quantity: 3, unitPrice: 899, totalPrice: 2697 },
    // 🔹 SMART WATCHES
    { id: 11, category: 'Smart Watch', itemName: 'Apple Watch 9', brand: 'Apple', quantity: 3, unitPrice: 499, totalPrice: 1497 },
    { id: 12, category: 'Smart Watch', itemName: 'Fitbit Versa 4', brand: 'Fitbit', quantity: 6, unitPrice: 199, totalPrice: 1194 },
    // 🔹 RECHARGE
    { id: 13, category: 'Recharge', itemName: 'Airtel Prepaid', brand: 'Airtel', quantity: 10, unitPrice: 299, totalPrice: 2990 },
    { id: 14, category: 'Recharge', itemName: 'Jio Prepaid', brand: 'Jio', quantity: 8, unitPrice: 239, totalPrice: 1912 },
    { id: 15, category: 'Recharge', itemName: 'VI Data Pack', brand: 'Vodafone Idea', quantity: 5, unitPrice: 199, totalPrice: 995 },
    // 🔹 REPAIRING
    { id: 16, category: 'Repairing', itemName: 'Screen Replacement', brand: 'OnePlus', quantity: 2, unitPrice: 120, totalPrice: 240 },
    { id: 17, category: 'Repairing', itemName: 'Battery Replacement', brand: 'Samsung', quantity: 3, unitPrice: 90, totalPrice: 270 },
    { id: 18, category: 'Repairing', itemName: 'Charging Port Fix', brand: 'Xiaomi', quantity: 4, unitPrice: 60, totalPrice: 240 },
    { id: 19, category: 'Repairing', itemName: 'Water Damage Repair', brand: 'Apple', quantity: 1, unitPrice: 250, totalPrice: 250 }
  ],
  
  pagination: true,
  pageSize: 10,
};

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { SalesTab } from 'src/app/features/sales/sales/sales_enum';
import { CommonPopupModelService } from 'src/app/shared/components/common-popup-model.service';
import { AddItemsPageComponent } from 'src/app/shared/components/add-items-page/add-items-page.component';
import { ModalPopupSize } from 'src/app/shared/common-enum/common-enum.module';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';
import { Product, StockCategory, ApiResponse } from './stock-list.model';


/**
 * StockListComponent - Point of Sale inventory management
 * 
 * Features:
 * - Display products in a responsive grid layout
 * - Search and filter products by name/category
 * - Manage shopping cart with add/remove/quantity controls
 * - Real-time cart total calculation
 * - Browse stock categories
 * 
 * Models:
 * - Product, StockCategory, ApiResponse imported from stock-list.model.ts
 */
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {
  // ===================== PUBLIC PROPERTIES =====================
  
  /** Current active tab/page */
  activeTabId: SalesTab | null = null;
  
  /** List of stock categories */
  tabs: StockCategory[] = [];
  
  /** Backup of original categories for reset on clear search */
  copyData: StockCategory[] = [];
  
  /** All available products */
  products: Product[] = [];
  
  /** Filtered/displayed products (for search results) */
  displayProducts: Product[] = [];
  
  /** Items in shopping cart */
  selectedItems: Product[] = [];
  
  /** Filtered search results for categories */
  searchValues: StockCategory[] = [];
  
  /** Controls visibility of category/product detail view */
  showDetailView: boolean = false;
  
  // ===================== PRIVATE PROPERTIES =====================
  
  /** Subject for managing subscriptions cleanup */
  private destroy$ = new Subject<void>();
  
  /** Unused property - consider removing in refactor */
  path!: string;
  
  /** Unused property - consider removing in refactor */
  bakflag: boolean = false;
  
  // ===================== CONSTANTS =====================
  
  private readonly PLACEHOLDER_IMAGE = 'assets/icons/placeholder.svg';
  private readonly MODAL_TITLE = 'Add category Card';
  private readonly MIN_QUANTITY = 0;

  /** Track which cart items have details open (by id) */
  cartDetailsOpen: Record<string | number, boolean> = {};

  // ===================== CONSTRUCTOR =====================
  
  constructor(
    private location: Location,
    private router: Router,
    private popupService: CommonPopupModelService,
    private stockService: CommonServiceTsService
  ) {
    this.initializeRouterListener();
  }

  // ===================== LIFECYCLE HOOKS =====================
  
  /**
   * Angular lifecycle hook - runs on component initialization
   */
  ngOnInit(): void {
    this.loadData();
    this.loadProducts();
  }

  /**
   * Angular lifecycle hook - cleanup subscriptions
   * IMPORTANT: Prevents memory leaks by unsubscribing from observables
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===================== DATA LOADING METHODS =====================
  
  /**
   * Initialize router listener to track navigation changes
   * Reloads data when navigating to Stock or Invoice tabs
   */
  private initializeRouterListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        const lastSegment = currentUrl.split('/').pop();
        this.activeTabId = lastSegment as SalesTab;
        
        // Reload data when navigating to specific tabs
        if ([SalesTab.Stock, SalesTab.Invoice].includes(this.activeTabId)) {
          this.loadData();
        }
      });
  }

  /**
   * Load stock categories from API
   * Includes error handling and fallback behavior
   */
  private loadData(): void {
    this.stockService.getstockcategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (list: StockCategory[]) => {
          this.tabs = list;
          // Create a deep copy for search reset functionality
          this.copyData = this.tabs.length > 0 ? structuredClone(this.tabs) : [];
          console.log('[StockList] Categories loaded:', this.tabs.length);
        },
        error: (error) => {
          console.error('[StockList] Error loading categories:', error);
          this.tabs = [];
          this.copyData = [];
        }
      });
    
    // Set detail view based on current tab
    this.showDetailView = this.activeTabId === SalesTab.Invoice;
  }

  /**
   * Load products for Point of Sale display
   * TODO: Replace with actual API call to backend
   */
  private loadProducts(): void {
    // Simulated product data - IMPORTANT: Replace with actual API call
    this.products = [
      { 
        id: 1, 
        name: 'iPhone 15 Pro', 
        price: 1299, 
        category: 'Smartphones', 
        stock: 25, 
        image: 'assets/icons/iphone.svg' 
      },
      { 
        id: 2, 
        name: 'Samsung Galaxy S24', 
        price: 999, 
        category: 'Smartphones', 
        stock: 18, 
        image: 'assets/icons/samsung.svg' 
      },
      { 
        id: 3, 
        name: 'AirPods Pro', 
        price: 249, 
        category: 'Accessories', 
        stock: 45, 
        image: 'assets/icons/airpods.svg' 
      },
      { 
        id: 4, 
        name: 'iPad Air', 
        price: 599, 
        category: 'Tablets', 
        stock: 12, 
        image: 'assets/icons/ipad.svg' 
      },
      { 
        id: 5, 
        name: 'Apple Watch', 
        price: 399, 
        category: 'Accessories', 
        stock: 30, 
        image: 'assets/icons/watch.svg' 
      },
      { 
        id: 6, 
        name: 'MacBook Pro', 
        price: 1999, 
        category: 'Laptops', 
        stock: 8, 
        image: 'assets/icons/macbook.svg' 
      },
    ];
    // Initialize display with all products
    this.displayProducts = [...this.products];
    console.log('[StockList] Products loaded:', this.products.length);
  }

  // ===================== VIEW CONTROL METHODS =====================
  
  /**
   * Toggle between product grid view and detail view
   * Used for category/product details navigation
   */
  toggleDetailView(): void {
    this.showDetailView = !this.showDetailView;
  }

  /**
   * Navigate back to previous view
   * Handles tab-specific navigation logic
   */
  navigateBack(): void {
    switch (this.activeTabId) {
      case SalesTab.Accessories:
        this.showDetailView = false;
        break;
      default:
        // Default behavior for other tabs
        break;
    }
    this.location.back();
  }

  // ===================== CATEGORY MANAGEMENT =====================
  
  /**
   * Open modal dialog to add a new stock category
   * Validates response and refreshes category list on success
   */
  openAddCategoryModal(): void {
    this.popupService.openModalPopup(
      AddItemsPageComponent,
      null,
      this.MODAL_TITLE,
      ModalPopupSize.MD,
      '',
      false,
      true
    ).then((resultData: any) => {
      if (resultData) {
        this.addNewCategory(resultData);
      }
    }).catch((error) => {
      console.error('[StockList] Modal error:', error);
    });
  }

  /**
   * Submit new category to API and refresh list
   * @param categoryData - Data for the new category
   */
  private addNewCategory(categoryData: any): void {
    this.stockService.allstockcategory(categoryData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse) => {
          if (response.isSuccess) {
            console.log('[StockList] Category added successfully');
            this.loadData(); // Refresh category list
          } else {
            console.warn('[StockList] Category add failed:', response.message);
          }
        },
        error: (error) => {
          console.error('[StockList] Error adding category:', error);
        }
      });
  }

  // ===================== SEARCH & FILTER METHODS =====================
  
  /**
   * Search products and categories by text
   * Filters both stock categories and products dynamically
   * @param searchText - Text to search for (case-insensitive)
   */
  onSearch(searchText: string): void {
    // If search is empty, reset to original data
    if (!searchText || searchText.trim() === '') {
      this.tabs = this.copyData.length > 0 ? [...this.copyData] : [];
      this.displayProducts = [...this.products];
      return;
    }

    const searchLower = searchText.toLowerCase().trim();

    // Filter stock categories
    this.searchValues = this.copyData.filter((item: StockCategory) =>
      item.stockcategory.toLowerCase().includes(searchLower)
    );
    this.tabs = this.searchValues.length > 0 ? this.searchValues : this.copyData;

    // Filter products
    this.displayProducts = this.products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );

    console.log('[StockList] Search results:', {
      categories: this.tabs.length,
      products: this.displayProducts.length
    });
  }

  // ===================== SHOPPING CART METHODS =====================
  
  /**
   * Add product to cart or increase quantity if already present
   * Prevents adding out-of-stock items
   * @param product - Product to add to cart
   */
  addToCart(product: Product): void {
    // Validate product and stock
    if (!product || product.stock <= 0) {
      console.warn('[Cart] Cannot add out-of-stock item:', product);
      return;
    }

    const existingItem = this.selectedItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity if item already in cart
      existingItem.quantity = (existingItem.quantity || 0) + 1;
      console.log('[Cart] Quantity updated:', existingItem.name, existingItem.quantity);
    } else {
      // Add new item with initial quantity of 1
      this.selectedItems.push({
        ...product,
        quantity: 1
      });
      // ensure details closed for newly added item
      this.cartDetailsOpen[product.id] = false;
      console.log('[Cart] Item added:', product.name);
    }
  }

  /**
   * Remove item from cart
   * @param itemId - ID of item to remove
   */
  removeFromCart(itemId: string | number): void {
    const itemIndex = this.selectedItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      const removedItem = this.selectedItems[itemIndex];
      this.selectedItems.splice(itemIndex, 1);
      // clean up details state
      delete this.cartDetailsOpen[itemId];
      console.log('[Cart] Item removed:', removedItem.name);
    }
  }

  /** Toggle details visibility for a cart item (by id) */
  toggleCartItemDetails(itemId: string | number): void {
    this.cartDetailsOpen[itemId] = !this.cartDetailsOpen[itemId];
  }

  /** Check if details for a cart item are open */
  isCartItemDetailsOpen(itemId: string | number): boolean {
    return !!this.cartDetailsOpen[itemId];
  }

  /** Helper to check for arrays in template */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Update quantity of item in cart
   * Prevents invalid quantities (must be > 0)
   * @param itemId - ID of item to update
   * @param newQuantity - New quantity value
   */
  updateQuantity(itemId: string | number, newQuantity: number): void {
    const item = this.selectedItems.find(cartItem => cartItem.id === itemId);
    
    if (!item) {
      console.warn('[Cart] Item not found for quantity update:', itemId);
      return;
    }

    if (newQuantity <= this.MIN_QUANTITY) {
      console.log('[Cart] Invalid quantity:', newQuantity, '- removing item');
      this.removeFromCart(itemId);
      return;
    }

    item.quantity = newQuantity;
    console.log('[Cart] Quantity updated:', item.name, newQuantity);
  }

  /**
   * Clear all items from shopping cart
   * Should typically prompt user for confirmation in production
   */
  clearCart(): void {
    const itemCount = this.selectedItems.length;
    this.selectedItems = [];
    console.log('[Cart] Cart cleared. Items removed:', itemCount);
  }

  /**
   * Calculate total price of all items in cart
   * @returns Total cart value
   */
  getCartTotal(): number {
    return this.selectedItems.reduce((total: number, item: Product) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return total + itemTotal;
    }, 0);
  }

  /**
   * Get cart item count
   * @returns Number of items in cart
   */
  getCartItemCount(): number {
    return this.selectedItems.length;
  }

  // ===================== PERFORMANCE OPTIMIZATION =====================
  
  /**
   * TrackBy function for product *ngFor loop
   * Improves performance by preventing unnecessary DOM re-renders
   * @param index - Index in the list
   * @param product - Product item
   * @returns Unique identifier for the product
   */
  trackByProductId(index: number, product: Product): string | number {
    return product.id;
  }

  /**
   * TrackBy function for category *ngFor loop
   * Improves performance by preventing unnecessary DOM re-renders
   * @param index - Index in the list
   * @param category - Category item
   * @returns Unique identifier for the category
   */
  trackByCategoryName(index: number, category: StockCategory): string {
    return category.stockcategory;
  }

  /**
   * TrackBy function for cart items *ngFor loop
   * Improves performance by preventing unnecessary DOM re-renders
   * @param index - Index in the list
   * @param item - Cart item
   * @returns Unique identifier for the item
   */
  trackByItemId(index: number, item: Product): string | number {
    return item.id;
  }

  /**
   * Safe accessor for product specs to avoid template type-check errors
   */
  getSpecs(product: any): any {
    return (product && (product as any)['specs']) || (product && (product as any)['specification']) || null;
  }
}

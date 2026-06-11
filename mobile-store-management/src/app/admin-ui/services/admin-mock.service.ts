import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminMockService {
  getStats() {
    return {
      cards: [
        { title: 'Active Users', value: 1284, change: '+4.3%' },
        { title: 'Monthly Sales', value: '$23,400', change: '+2.1%' },
        { title: 'Stock Items', value: 5420, change: '-0.8%' },
        { title: 'Open Orders', value: 42, change: '+1.5%' },
      ]
    };
  }

  getRecentUsers() {
    return [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
      { id: 3, name: 'Carla Gomez', email: 'carla@example.com' }
    ];
  }

  getRecentSales() {
    return [
      { order: '#1001', amount: '$299.00', date: '2026-05-28' },
      { order: '#1000', amount: '$49.99', date: '2026-05-27' },
      { order: '#999', amount: '$1,299.00', date: '2026-05-26' }
    ];
  }

  getStockSummary() {
    return [
      { category: 'Mobiles', items: 320, low: 12 },
      { category: 'Accessories', items: 1200, low: 45 },
      { category: 'Spares', items: 3900, low: 120 }
    ];
  }

  // Users CRUD mock
  private users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'manager' },
    { id: 3, name: 'Carla Gomez', email: 'carla@example.com', role: 'staff' }
  ];

  listUsers() { return this.users.slice(); }
  getUser(id: number) { return this.users.find(u => u.id === id) || null; }
  createUser(payload: any) { const id = Math.max(...this.users.map(u => u.id)) + 1; const u = { id, ...payload }; this.users.push(u); return u; }
  updateUser(id: number, payload: any) { const idx = this.users.findIndex(u => u.id === id); if (idx > -1) { this.users[idx] = { ...this.users[idx], ...payload }; return this.users[idx]; } return null; }
  deleteUser(id: number) { this.users = this.users.filter(u => u.id !== id); }
}

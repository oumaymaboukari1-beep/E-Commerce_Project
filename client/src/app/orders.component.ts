import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-orders',
  template: `
<h3>Mes Achats</h3>
<div *ngFor="let order of orders">
<p>Produit ID: {{order.productId}} | Quantité: {{order.qty}} | Date: {{order.date}}</p>
</div>
  `
})
export class OrdersComponent {
  orders: any[] = [];
 
  constructor(private http: HttpClient) {
    // Exemple : récupérer les achats du client "testuser"
    this.http.get<any[]>('http://localhost:3001/orders/testuser')
      .subscribe(data => this.orders = data);
  }
}
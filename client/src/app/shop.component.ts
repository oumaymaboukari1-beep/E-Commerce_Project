@Component({
  selector: 'app-shop',
  template: `
<h2>Boutique</h2>
<div *ngFor="let product of products">
<p>{{product.name}} - {{product.price}} DT (Stock: {{product.stock}})</p>
<button (click)="buy(product)">Acheter</button>
</div>
 
    <button (click)="showOrders()">Mes Achats</button>
 
    <app-orders *ngIf="showOrdersList"></app-orders>
  `
})
export class ShopComponent {
  products = [
    { id: 1, name: "Acer Nitro 16", price: 3699, stock: 5 },
    { id: 2, name: "Dell Inspiron 15", price: 2299, stock: 7 }
  ];
  showOrdersList = false;
 
  buy(product: any) {
    console.log("Acheter", product);
  }
 
  showOrders() {
    this.showOrdersList = true;
  }
}
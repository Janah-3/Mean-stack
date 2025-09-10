import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', description: 'A high-end laptop' },
    { id: 2, name: 'Phone', description: 'A smartphone' },
    { id: 3, name: 'Tablet', description: 'A new tablet' }
  ];

  selectedProduct: Product | null = null;

  viewDetails(product: Product) {
    this.selectedProduct = product;
  }
}

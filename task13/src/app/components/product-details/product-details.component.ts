import { Component, Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: Product;
}

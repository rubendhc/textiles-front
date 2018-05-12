import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Product } from './product.model';
import { ProductService } from './product-service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: Product[];
  productSelected: Product;

  constructor( private productService: ProductService,
               private router: Router, 
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    //Recibe Observable
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  goToStore(): void{
    
    this.router.navigate(['/store/product-list']);
}

}

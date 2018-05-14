import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../../product.model';
import { Category } from '../../categories/category.model';

import { ProductService } from '../../../product-service/product.service';
import { CategoryService } from '../../../product-service/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {

  product= new Product();
  categories: Category[];
  enableCreate: boolean = true;
  
  //@Input() productId: Product;

  

  constructor( private productService: ProductService, 
               private route: ActivatedRoute,
               private categoryService: CategoryService) { }

  ngOnInit() {
  	//this.getProducts();
    //this.product = this.productId;
    this.getProduct();
    this. getCategories();

    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

  
  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }


 
  save(product: Product): void {
    console.log(product);
    this.productService.updateProduct(this.product)
      .subscribe();
  }

   getCategories(): void {
      //Recibe Observable
      this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    asignarCategoria(category: Category): void{
      this.product.category_id = category.id;
      console.log(this.product.category_id);
    }

    


}

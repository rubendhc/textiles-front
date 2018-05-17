import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Data } from '../../../../data';

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

  products: Product[];
  product= new Product();
  categories: Category[];
  enableCreate: boolean = true;
  
  //@Input() productId: Product;

  

  constructor( private productService: ProductService, 
               private route: ActivatedRoute,
               private categoryService: CategoryService,
               private data: Data) { }

  ngOnInit() {
  	//this.getProducts();
    //this.product = this.productId;
    this.product = this.data.product;
    this.getCategories();
    console.log(this.product);
    this.seleccionarOperacion()
  }

  
  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  save(product: Product): void{
     if(this.enableCreate){
         this.add(product);
     }else{
       this.update(product);
       this.enableCreate = true;
     }

     this.product = new Product()
     this.data.product = new Product()
  }


 
  update(product: Product): void {
    console.log(product);
    this.productService.updateProduct(this.product)
      .subscribe();
  }

   add(product: Product){
    if (!product) { return; }
      this.productService.addProduct(product)
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

    seleccionarOperacion(){
      if(this.product.id){
        this.enableCreate = false;
        console.log('true on selecOp');
      }else{
        this.enableCreate = true;
        console.log('false on selecOp');
      }
    }


}

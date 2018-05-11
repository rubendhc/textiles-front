import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../product.model';

import { ProductService } from '../../../product-service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {

  model = new Product();
  submitted = false;
  products: Product[];

  //@Input() productId: Product;

  

  constructor(private productService: ProductService) { }

  ngOnInit() {
  	//this.getProducts();
    //this.model = this.productId;
    this.resibirIds();
  }

  onSubmit(): void {
  	this.submitted = true;
  }	

  newProduct(){
  	this.model = new Product();
  	console.log(this.model);
  	this.add(this.model);
  	
  }
/*
  getProducts(): void{
	this.productService.getProducts().subscribe(products => this.products = products);
}*/

  add(product: Product): void{

	if(!product) { return;}
	  this.productService.addProduct(product).subscribe(product=>{
		this.products.push(product);
    console.log(product);
	});

  }

  resibirIds(): void{
    console.log(this.productService.retrieveIds());
    let ids: Array<Number>=[]
    ids = this.productService.retrieveIds();
    console.log('Hola desde carrito de compra ids = '+ ids);
  }

}

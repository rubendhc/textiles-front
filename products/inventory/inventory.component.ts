import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { NegativeSoldService } from '../product-service/negative-sold.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

	products: Product[] = [];
	negProducts : Array<Product> = [];

  constructor( private productService: ProductService ) { }

  ngOnInit() {
  	this.getNegProduct();
  	this.copiarNeg()
  }


  getNegProduct(): void{
  	this.productService.getProducts().subscribe(products=> this.products = products);
  }
  


  copiarNeg(): void{
  	for(let product of this.products){
  		if (product.amount < 0) {
  			this.negProducts.push(product);
  			console.log(product);
  		}
  	}
  }



}

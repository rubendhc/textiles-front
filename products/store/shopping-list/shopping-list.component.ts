import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../../products/product.model';
import { ProductService } from '../../../products/product-service/product.service';
import { Data } from '../../../data';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  product: Product;
  productSelected: Product;
  

  //productShop: Array<Product>;
  //@Output() AddedBill = new EventEmitter<Array<Product>>();
  
  constructor(private route: ActivatedRoute, private productService: ProductService, private data: Data) { 
     
  }

  ngOnInit() {
     //this.resibirIds();
     //const ids=+this.route.snapshot.paramMap.getAll('ids');
     //console.log(ids);
     // this.stringToArry(id);
     // this.route.params.subscribe(params => {this.id = params['ids'].split(',');});
     //console.log(this.id);
     //console.log(this.id[0]);
     //console.log(this.id[1]);
     //console.log(this.id[2]);
     
     // console.log(this.data.storage);
     //this.data.storage = this.data.storage;

  }

  // getProduct(): void{
  //   const id=+this.route.snapshot.paramMap.get('id');
  //   this.productService.getProduct(id)
  //   .subscribe(product => this.product = product);
  // }

  incrementAmount(product: Product): void {
    this.productSelected = product;
    this.productSelected.cantProduct++;
    this.calculateTotal(this.productSelected);
  }

  decrementAmount(product: Product): void {

    if(this.productSelected.cantProduct > 1){
      this.productSelected.cantProduct--;
      this.calculateTotal(this.productSelected);
    }
  }

  calculateTotal(product: Product): void{

  this.productSelected = product;
  this.productSelected.totalPrice = this.productSelected.cantProduct * this.productSelected.price;
}

  
  //Evento para actualizar cantidad desde el Input
  onkey(event: any, product: Product){
    this.productSelected = product;
    this.productSelected.cantProduct= event.target.value;
    this.calculateTotal(this.productSelected);
    console.log(this.productSelected);
  }

   i: number; //Contador

  //Acciones de la Tabla
  deleteItem(product: Product):void{
    let pos = this.data.storage.indexOf(product);
    this.data.storage.splice(pos, 1);
    console.log(this.data.storage);
   
  }

  // sendBill():void {
  //   this.AddedBill.emit(this.data.storage);
  // }

  stringToArry(ids: string): number[]{


      let lista: Array<number>;
     

      for (let id of ids) {
        let n = parseInt(id)
         lista.push(n);    
      }


      return lista;

  }

  
}

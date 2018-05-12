import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';

import { Product } from '../../../product.model';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  @Output() productAdded = new EventEmitter<Product>();


  selectedItem: Product;

  constructor() { }

  ngOnInit() {

  }

  cantProduct = 1; //Global

  incrementAmount(): void {
    this.cantProduct++;
  }

  decrementAmount(): void {
    if(this.cantProduct > 1){
      this.cantProduct--;
    }
  }

  llamarEvento(product: Product):void {
    product.cantProduct = this.cantProduct;
    this.calculateTotal(product);
    this.productAdded.emit(product);
  }

  productSelected(product: Product): void {
    this.selectedItem = product;
  }

  calculateTotal(product: Product): void{
  this.selectedItem = product;
  this.selectedItem.totalPrice = this.selectedItem.cantProduct * this.selectedItem.price;
  }
  
  //Evento para actualizar cantidad de producto sin añadir aún en el objeto Product
  // onkey(event: any, product: Product){
  //   this.selectedItem = product;
  //   this.cantProduct = event.target.value;
  //   //console.log(this.cantProduct);
  // }


  onkey(event: Event){

    //La función del operador "+" es convertir un dato de String a Number
    let cantU = +(<HTMLInputElement>event.target).value; 
    this.cantProduct = cantU;
  }



}


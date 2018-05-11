import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Product } from '../../../../products/product.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('priceInput') priceInputRef: ElementRef;

  @Output() productAdded = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }
/*
  onAddItem() {
    const addName = this.nameInputRef.nativeElement.value;
    const addAmount = this.amountInputRef.nativeElement.value;
    const addPrice = this.amountInputRef.nativeElement.value;
    const newListProduct = new Product(addName, addAmount, addPrice);
    this.productAdded.emit(newListProduct);
  }*/

}

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-bill',
  templateUrl: './product-bill.component.html',
  styleUrls: ['./product-bill.component.css']
})

export class ProductBillComponent implements OnInit {

  @Input() shopList: Array<Product>;


  constructor() { }

  ngOnInit() {
  }


  receiveListProduct(product: Array<Product>):void {
  	this.shopList = product;
  }


}

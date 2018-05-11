import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ProductService } from '../../product-service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../product.model';
import { Data } from '../../../data';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [ProductService]

})
export class StockComponent implements OnInit {

  products: Product[];



  constructor(private productService: ProductService, private router: Router,private data:Data) { }

  ngOnInit() {
  	this.getProducts();
  }

  getProducts(): void {
    //Recibe Observable
    this.productService.getProducts().subscribe(products => this.products = products);
  }

   sendId(): void{
    //this.data.storage = [1,2,3,4,5,6,7,8,1012];
  }

  irAcarrito(): void{
    this.router.navigate(['/shopping-list']);
}


}

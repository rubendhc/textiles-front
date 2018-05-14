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
  id: number = 0;



  constructor(private productService: ProductService, private router: Router,private data:Data) { }

  ngOnInit() {
  	this.getProducts();
  }

  getProducts(): void {
    //Recibe Observable
    this.productService.getProducts().subscribe(products => this.products = products);
  }

modificar(product: Product){
  this.id = product.id;
  this.router.navigate(['/products/inventory/stock/product-form/'+this.id]);
}
  

}

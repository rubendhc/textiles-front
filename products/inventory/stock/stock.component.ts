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
  productSelected: Product;
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
  this.data.product = product;
  this.router.navigate(['/products/inventory/product-form/']);
}

 incrementAmount(product: Product): void {
    this.productSelected = product;
    this.productSelected.amount++;
    this.update(product);
    //this.calculateTotal(this.productSelected);
  }

  decrementAmount(product: Product): void {

    if(this.productSelected.amount >= 1){
      this.productSelected.amount--;
      this.update(product);
      //this.calculateTotal(this.productSelected);
    }
  }
onkey(event: any, product: Product){
    let amount = event.target.value;
    if(amount >= 0){
      this.productSelected = product;
      this.productSelected.amount= amount;
      this.update(product);
      //this.calculateTotal(this.productSelected);
      //console.log(this.productSelected);  
    }else{
      this.productSelected = product;
      this.productSelected.amount= 0;
      this.update(product);
    }
    
  }

  delete(product: Product): void {
      this.products = this.products.filter(h => h !== product);
      this.productService.deleteProduct(product).subscribe();
    }

    update(product: Product): void {
      console.log(product);
      this.productService.updateProduct(product)
      .subscribe();
  }

  

}

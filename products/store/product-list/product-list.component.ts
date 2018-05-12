import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../product.model';
import { ProductService } from '../../product-service/product.service';
import { Router } from '@angular/router';
import { Data } from '../../../data';

//import { PRODUCTS } from '../mock-products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

//  selectedProduct: Product;
//  @Output() productWasSelected = new EventEmitter<Product>();

  //Recibe los datos de prueba junto con el Modelo Product
  products: Product[];

  productSelected: Product;

  contCarrito: number;

  @Input() productItem: Product;
 

  productArray: Array<Product> = [];

  constructor(private productService: ProductService,private router: Router,private data: Data) { }

  ngOnInit() {
    this.getProducts();
    this.productArray = this.data.products;
    this.contCarrito= this.productArray.length; //Cantidad de Productos guardados al contador
  }
  

  /*recibirItem(product: Product): void{

     //console.log(this.productArray.indexOf(product));
    // //Validación para no agregar el dato dos veces en la tabla Shopping
     if(!this.productExist(product, this.productArray)){
        this.productArray.push(product);  
     }

     console.log(this.productArray);
  }*/

  recibirItem(product: Product): void{
    
    if(this.productArray.length > 0)
    {
      if(!(this.validarP(product)))
      {
        this.productArray.push(product);
        this.contCarrito = this.productArray.length;
      } 
    }else{
      this.productArray.push(product);
      this.contCarrito = this.productArray.length;
    }
  }





  getProducts(): void {
    //Recibe Observable
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  sendId(){
    this.productService.saveIds([1,2,3,4,5]);
  }


  productExist(productIn: Product, products: Array<Product>): boolean{

     for (let p of products) {
       if(p.id === productIn.id){
         return true;
       }else{
         return false;
       }
     }
  }

  public validarP(product: Product): boolean{

    let valid: boolean;
    for (let i = 0; i < this.productArray.length; i++) 
    {
      if(this.productArray[i].id == product.id)
      {
       this.productArray[i].cantProduct += product.cantProduct;
       valid = true;
      }
    }
    return valid;
  }


 
 
}

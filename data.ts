import { Injectable } from '@angular/core';
import { Product } from './products/product.model';

@Injectable()
export class Data {

    public storage: Product[];

    public constructor() { }

 recibirItem(product: Product): void{
    
    let pos = this.storage.indexOf(product);


    //Validación para no agregar el dato dos veces en la tabla Shopping
    if(!this.storage[pos]){
       this.storage.push(product);  
    }

    console.log(this.storage);
  }
    
}
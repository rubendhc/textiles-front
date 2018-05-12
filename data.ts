import { Injectable } from '@angular/core';
import { Product } from './products/product.model';

@Injectable()
export class Data {

    public products: Array<Product> = [];

    public constructor() { }

 
    
}
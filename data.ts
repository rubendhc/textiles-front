import { Injectable } from '@angular/core';
import { Product } from './products/product.model';

@Injectable()
export class Data {

    public products: Array<Product> = [];
    public product: Product = new Product();
    public api_token: string ='';
    public currentUserId: number= 0;
    

    public constructor() { }

 
    
}
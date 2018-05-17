import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Product } from './product.model';
import { ProductService } from './product-service/product.service';
import { UserService } from '../user/shared/user.service';
import { User } from '../user/shared/user.model';
import { Data } from '../data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: Product[];
  productSelected: Product;
  //user : any;
  user: User = new User();

  constructor( private productService: ProductService,
               private router: Router, 
               private route: ActivatedRoute,
               private userService: UserService,
               private data: Data) { }

  ngOnInit() {
    this.getProducts();
    let id = this.data.currentUserId;
    this.getLogedUser(id);
    //this.logedUser = this.user;
    
  }

  getProducts(): void {
    //Recibe Observable
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  goToStore(): void{
    
    this.router.navigate(['/store/product-list']);
}

logOut(){
  localStorage.removeItem('api_token');
  this.user = new User();
  this.router.navigate(['/login']);
}

getLogedUser(id: number){
  this.userService.getUser(id).subscribe(user=>this.user = user);
}

} 

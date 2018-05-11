import { Component, OnInit } from '@angular/core';
//import { ProductService } from '../../product-service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  showProductList(): void{
  		this.router.navigate(['product-list'], {relativeTo: this.route} )
  }

  showShoppingList(): void{
  		this.router.navigate(['shopping-list'], {relativeTo: this.route} )
  }

}

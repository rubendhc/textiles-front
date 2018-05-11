import { Component, OnInit, Input } from '@angular/core';

import { Product }from "../../product.model";
import { ProductService } from '../../product-service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;



  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getProduct(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
    .subscribe(product => this.product = product);
    console.log(this.product); 
  }

}

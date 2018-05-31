import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../product-service/sale.service';
import { BillProduct } from '../product-bill/billProduct.model';
import { ProductService } from '../../product-service/product.service';
import { Product } from '../../product.model';



@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  sales: BillProduct[];	

  constructor(	private saleService: SaleService,
  				private productService: ProductService ) { }

  ngOnInit() {
  	this.getSales();
  }


  getSales(){
  	this.saleService.getBillProducts('sales-products').subscribe(sales => this.sales = sales);
  }

}

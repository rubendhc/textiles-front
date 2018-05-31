import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product.model';
import { Bill } from './bill.model';
import { BillService } from '../../product-service/bill.service';
import { SaleService } from '../../product-service/sale.service';
import { Data  } from '../../../data';
import { BillProduct } from '../product-bill/billProduct.model'; 



 
@Component({
  selector: 'app-product-bill',
  templateUrl: './product-bill.component.html',
  styleUrls: ['./product-bill.component.css']
})

export class ProductBillComponent implements OnInit {

  shopList: Array<Product>;
  total: number = 0;
  v: Bill = new Bill();
  bill: Bill = new Bill();
  tmp = "TMP";
  pivot = new BillProduct();
  idBill: number = 0;


  constructor(private data: Data,
              private billService: BillService,
              private saleService: SaleService) { }

  ngOnInit() {
    this.shopList = this.data.products;
    this.getTotal();
    //this.getBilId();
    

  }


  receiveListProduct(product: Array<Product>):void {
  	this.shopList = product;
  }

  getTotal(): void{
    for (let product of this.shopList) {
      this.total = this.total + product.totalPrice; 

    }
  }


  getBilId(): void{
    this.billService.getBillTest().subscribe(bill => {
          this.idBill = bill.id;
          this.bill = bill;
          
      });  
  }
/*
  getBill():void {
    this.billService.
  }*/

  
  

  addBill(customId: number, customName: string, typePay: string, status: string):void { 
    console.log(this.bill);
    this.bill.user_id = parseInt(localStorage.getItem('id_user'));
    this.bill.tmp = this.tmp;
    this.bill.total = this.total;
    this.bill.status = status;
    this.bill.typePay = typePay;
    this.bill.custom = customName;
    this.bill.custom_id = customId;


    if (this.shopList.length > 0) {
      this.productRegister();
      console.log(this.bill.products);

      this.billService.addBill(this.bill).subscribe(bill=>this.v = bill);
      console.log('response', this.v);


      /*this.billService.updateBill(this.bill).subscribe(bill=> this.bill = bill);
       this.productRegister();*/
    }
    
    this.shopList = [];
    this.data.products = [];
    
    //this.getBill();
    
    
    //console.log(this.bill);
    
   

  }


   productRegister():void {
   // console.log(this.bill.id);
    for (let product of this.shopList ) {
     this.bill.products.push(product);

    }



  }

 /* productRegister():void {
   // console.log(this.bill.id);
    for (let product of this.shopList ) {
      this.pivot.total = product.totalPrice;
      this.pivot.amount = product.cantProduct;
      this.pivot.bill_id = this.bill.id;
      this.pivot.product_id = product.id;
      this.saleService.addBillProduct(this.pivot).subscribe();

    }

  }*/

}

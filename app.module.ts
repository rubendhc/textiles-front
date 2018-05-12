import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
///import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/store/product-list/product-list.component';
import { ProductDetailComponent } from './products/store/product-detail/product-detail.component';
import { ProductItemComponent } from './products/store/product-list/product-item/product-item.component';
import { ShoppingListComponent } from './products/store/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './products/store/shopping-list/shopping-edit/shopping-edit.component';
import { AppRoutingModule } from './app-routing.module';
//import { BarChartDemoComponent } from './chart-product/chart-product.component';

import { ProductService} from './products/product-service/product.service';
import { ProductBillComponent } from './products/store/product-bill/product-bill.component';
import { UserComponent } from './user/user.component';
import { StockComponent } from './products/inventory/stock/stock.component';
import { ProductFormComponent } from './products/inventory/stock/product-form/product-form.component';
import { Data } from './data';
import { StoreComponent } from './products/store/store.component';
import { InventoryComponent } from './products/inventory/inventory.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';




@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ProductBillComponent,
    UserComponent,
    StoreComponent,
    StockComponent,
    ProductFormComponent,
    InventoryComponent,
    SignInComponent,
    SignUpComponent,
    //BarChartDemoComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
    //ChartsModule
  ],
  providers: [ProductService, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }

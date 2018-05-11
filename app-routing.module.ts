import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/store/product-list/product-list.component';
import { ProductDetailComponent } from './products/store/product-detail/product-detail.component';
import { ProductBillComponent } from './products/store/product-bill/product-bill.component';
import { ProductItemComponent } from './products/store/product-list/product-item/product-item.component';
import { ShoppingListComponent } from './products/store/shopping-list/shopping-list.component';
import { StockComponent } from './products/inventory/stock/stock.component';
import { ProductFormComponent } from './products/inventory/stock/product-form/product-form.component';
import { StoreComponent } from './products/store/store.component';
import { Product } from './products/product.model';


const routes: Routes = [ { path: 'products', component: ProductsComponent },
                         { path: 'store', component: StoreComponent, 
                         children: [
                             {path: 'product-list', component: ProductListComponent},
                             {path: 'shopping-list', component: ShoppingListComponent},
                             {path: 'product-detail', component: ProductDetailComponent},
                         ] },
                         { path: 'product-list', component: ProductListComponent },
                         //{ path: 'product-detail', component: ProductDetailComponent },
                         //{ path: 'product-item', component: ProductItemComponent },
                         { path: 'product-bill', component: ProductBillComponent },
                         { path: 'shopping-list', component: ShoppingListComponent},
                         { path: 'product-form', component: ProductFormComponent },
                         { path: 'stock', component: StockComponent }
                       ];

@NgModule({
  exports: [RouterModule],

  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }

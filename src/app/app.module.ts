import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { DeleteCategoryModalComponent } from './components/delete-category-modal/delete-category-modal.component';
import { AddOrEditCategoryModalComponent } from './components/add-or-edit-category-modal/add-or-edit-category-modal.component';
import { ShowCategoryComponent } from './components/show-category/show-category.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AddOrEditProductModalComponent } from './components/add-or-edit-product-modal/add-or-edit-product-modal.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';



const ROUTES: Routes = [
  {path: '', component: ProductComponent},
  {path: 'category', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteCategoryModalComponent,
    AddOrEditCategoryModalComponent,
    ShowCategoryComponent,
    SideNavComponent,
    HeaderNavComponent,
    ProductComponent,
    AddOrEditProductModalComponent,
    DeleteProductModalComponent,
    ShowProductComponent,
    ShopComponent,
    CartComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

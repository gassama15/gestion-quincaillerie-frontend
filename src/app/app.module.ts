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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteCategoryModalComponent,
    AddOrEditCategoryModalComponent,
    ShowCategoryComponent,
    SideNavComponent,
    HeaderNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

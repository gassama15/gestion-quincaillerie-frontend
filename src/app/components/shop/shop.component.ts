import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy{

  products;
  productSub;
  baseUrlImage = `${environment.api_image}`;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productSub = this.productService.getProducts().subscribe(
      (response) => {
        console.log(response);
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() products: Product[];
  productModalOpen = false;
  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onEdit(product: Product): void {
    this.productModalOpen = true;
    this.selectedProduct = product
  }

  onDelete(product: Product): void {

  }

  addProduct(): void {
    this.productModalOpen = true;
  }

  handleFinish(product){
    if (product) {
      console.log(product);
      if (this.selectedProduct) {
        // Edit product
      } else {
        // Add product
        this.productService.addProduct(product).subscribe(
          (data) => {
            // console.log(data);
            this.products.unshift(data);
          }
        );
      }
    }
    this.productModalOpen = false;
  }

}

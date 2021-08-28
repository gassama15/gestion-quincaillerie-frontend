import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() products: Product[] = [];
  productModalOpen = false;
  selectedProduct: Product;
  file: File;
  progress = 0;
  baseUrlImage = `${environment.api_image}`;

  constructor(private productService: ProductService,
    private fileService: FileUploadService) { }

  ngOnInit(): void {
  }

  onEdit(product: Product): void {
    this.productModalOpen = true;
    this.selectedProduct = product
  }

  onDelete(product: Product): void {

  }

  addProduct(): void {
    this.selectedProduct = undefined;
    this.productModalOpen = true;
  }

  handleFinish(event){
    if (event && event.product) {
      let product = event.product ? event.product : null;
      this.file = event.file ? event.file : null;
      console.log(product);
      if (this.selectedProduct) {
        // Edit product
        product.idProduit = this.selectedProduct.idProduit;
        this.editProductToServer(product);
      } else {
        // Add product
        this.addProductToServer(product)
      }
    }
    this.productModalOpen = false;
  }


  uploadImage(event){
    return new Promise(
      (resolve, reject) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("requête envoyée avec succés");
            break;

          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            // console.log("progess --> ", this.progress);
            if (this.progress == 100) {
              resolve(true);
            }
            break;

          case HttpEventType.Response:
            console.log(event.body);
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
      }
    )
  }


  addProductToServer(product){
    this.productService.addProduct(product).subscribe(
      (data) => {
        // console.log(data);
        if (this.file) {
          this.fileService.uploadImage(this.file).subscribe(
            (event: HttpEvent<any>) => {
              this.uploadImage(event).then(
                () => {
                  setTimeout(() => {
                    this.products.unshift(data);
                  }, 3000);
                }
              )
            }
          );
        }
      }
    );
  }


  editProductToServer(product){
    this.productService.updateProduct(product).subscribe(
      (data: Product) => {
        product.categoryId = product.category.idCategorie;
        product.categoryLibelle = product.category.libelle;
        if (this.file) {
          this.fileService.uploadImage(this.file).subscribe(
            (event: HttpEvent<any>) => {
              this.uploadImage(event).then(
                () => {
                  // update frontend
                 setTimeout(() => {
                  this.updateProduct(product);
                 }, 3000);
                }
              )
            }
          );
          this.fileService.deleteImage(product.oldPhoto).subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          // update frontend
          this.updateProduct(product);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProduct(product){
     // update frontend
     const index = this.products.findIndex(p => p.idProduit == product.idProduit);
     this.products = [
       ...this.products.slice(0, index),
       product,
       ...this.products.slice(index+1)
     ];
  }

}

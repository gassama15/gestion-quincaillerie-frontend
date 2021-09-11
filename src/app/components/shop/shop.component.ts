import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  productSub: Subscription;
  baseUrlImage = `${environment.api_image}`;
  currentPage = 0;
  pages = [];
  totalPages:number

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    /* before pagination feature
    this.productSub = this.productService.getProducts().subscribe(
      (response) => {
        console.log(response);
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
    */
   this.productSub = this.productService.productSub.subscribe(
     (data) => {
      if (data.length) {
        // console.log(data.length/6)
        const totalPages = Math.ceil(data.length/6);
        this.totalPages = totalPages
        let newPages = [];
        for (let index = 0; index < totalPages; index++) {
          newPages[index] = index;
        }
        this.pages = newPages;
      }
       this.products = this.productService.getProductsByPage(this.currentPage);
     }
   );
   this.productService.emitProducts();
  }

  openImageModal(id) {
    let modal = document.getElementById('myModal-'+id);

    let img = document.getElementById('myImg-'+id) as HTMLImageElement;
    let modalImg = document.getElementById('img01-'+id) as HTMLImageElement;
    let captionText = document.getElementById('caption-'+id);


      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;

  }

  closeImageModal(id) {
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0] as HTMLElement;
    let modal = document.getElementById('myModal-'+id);

    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
  }

  addToCart(p: Product): void {
    this.cartService.addTocart(p);
  }

  deleteFromCart(p: Product): void {
    this.cartService.deleteFromCart(p);
  }

  changePage(numPage: number): void {
    const products = this.productService.getProductsByPage(numPage);
    if (products) {
      this.products = products;
      this.currentPage = numPage;
    }
  }

  nextPage(): void {
    const newCurrentPage = this.currentPage+1;
    const products = this.productService.getProductsByPage(newCurrentPage);
    if (products) {
      this.products = products;
      this.currentPage = newCurrentPage;
    }
  }

  prevPage(): void {
    const newCurrentPage = this.currentPage-1;
    const products = this.productService.getProductsByPage(newCurrentPage);
    if (products) {
      this.products = products;
      this.currentPage = newCurrentPage;
    }
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}

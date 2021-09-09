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

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}

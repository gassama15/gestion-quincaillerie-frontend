import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit, OnDestroy {

  @Input() produit: Product;
  productForm: FormGroup;
  categories: Category[];
  categorySub: Subscription;
  idCategorie = 1;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService) {
    this.productForm = fb.group({
      productInfos: fb.group({
        nomProduit: ['', Validators.required],
        description: ['', Validators.required],
        prix: ['', Validators.required],
        qte: ['', Validators.required],
      }),
      illustration: fb.group({
        photo: ['', Validators.required]
      })
    })
  }

  selectCategory(idCategorie: number){
    this.idCategorie = idCategorie;
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService
    .getCategories().subscribe(
      (response) => {
        this.categories = response;
        // console.log(this.categories)
      },
      (error) => {

      }
    );
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

}

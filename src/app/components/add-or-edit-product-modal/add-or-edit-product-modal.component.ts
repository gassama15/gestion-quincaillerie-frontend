import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
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
export class AddOrEditProductModalComponent implements OnInit, OnDestroy, OnChanges {

  @Input() produit: Product;
  @Output() finish = new EventEmitter();
  productForm: FormGroup;
  categories: Category[];
  categorySub: Subscription;
  scategory;
  file: File;

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

  selectCategory(category: Category){
    this.scategory = category;
  }

  get isProductInfosInvalid(): boolean {
    return this.productForm.get('productInfos').invalid;
  }

  get isIllustrationInvalid(): boolean {
    if (this.produit) {
      return false;
    }
    return this.productForm.get('illustration').invalid;
  }

  handleCancel(){
    this.finish.emit();
    this.close();
  }

  handleFinish(){
    const product = {
      ...this.productForm.get('productInfos').value,
      ...this.productForm.get('illustration').value,
      category: this.scategory,
      oldPhoto: null
    };

    if (this.produit) {
      product.oldPhoto = this.produit.oldPhoto;
    }

    if (this.file) {
      product.photo = this.file.name;
    }else {
      product.photo = this.produit.oldPhoto;
    }

    this.finish.emit({
      product: product,
      file: this.file ? this.file : null
    });
    this.close();
  }

  close(){
    this.productForm.reset();
    this.scategory = this.categories[0];
  }

  detectFile(event){
    this.file = event.target.files[0];
  }

  updateForm(product: Product){
    console.log("prod edit --> ",product)
    this.productForm.patchValue({
      productInfos:{
        nomProduit: product.nomProduit,
        description: product.description,
        prix: product.prix,
        qte: product.qte,
      }
    });
    product.oldPhoto = product.photo;
    let category: Category = <Category>{idCategorie:product.categoryId,libelle:product.categoryLibelle};
    // console.log("categ ---> ", JSON.stringify(category))
    this.selectCategory(category);
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService
    .getCategories().subscribe(
      (response) => {
        this.categories = response;
        if (!this.produit) {
          this.scategory = this.categories[0];
        }
        // console.log(this.categories)
      },
      (error) => {

      }
    );
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.produit) {
      this.updateForm(this.produit);
    }
  }

}

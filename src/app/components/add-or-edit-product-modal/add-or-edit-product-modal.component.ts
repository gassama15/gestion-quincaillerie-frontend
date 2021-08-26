import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
      category: this.scategory
    };
    if (this.file) {
      product.photo = this.file.name;
    }
    this.finish.emit(product);
    this.close();
  }

  close(){
    this.productForm.reset();
    this.scategory = this.categories[0];
  }

  detectFile(event){
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService
    .getCategories().subscribe(
      (response) => {
        this.categories = response;
        this.scategory = this.categories[0];
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

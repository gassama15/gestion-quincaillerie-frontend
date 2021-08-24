import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-or-edit-category-modal',
  templateUrl: './add-or-edit-category-modal.component.html',
  styleUrls: ['./add-or-edit-category-modal.component.css']
})
export class AddOrEditCategoryModalComponent implements OnInit, OnChanges {

  @Input() categorie: Category;
  @Output() finish = new EventEmitter();
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      libelle: ["", Validators.required]
    })
  }


  get isFormValid(): boolean {
    return this.categoryForm.invalid;
  }

  handleCancel(){
    this.finish.emit();
    this.close();
  }


  handleFinish(){
    const category = {
      ...this.categoryForm.value
    }
    this.finish.emit(category);
    this.close();
  }

  close(){
    this.categoryForm.reset();
  }

  updateForm(category: Category){
    console.log(category);
    this.categoryForm.patchValue({
      libelle: category.libelle
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.categorie) {
      this.updateForm(this.categorie);
    }
  }

}

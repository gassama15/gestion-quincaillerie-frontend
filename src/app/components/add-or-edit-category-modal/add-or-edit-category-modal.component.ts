import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-or-edit-category-modal',
  templateUrl: './add-or-edit-category-modal.component.html',
  styleUrls: ['./add-or-edit-category-modal.component.css']
})
export class AddOrEditCategoryModalComponent implements OnInit {

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

  ngOnInit(): void {
  }

}

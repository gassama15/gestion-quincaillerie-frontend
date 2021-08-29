import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.css']
})
export class DeleteCategoryModalComponent implements OnInit {

  @Input() category: Category;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancelDelete(){
    this.cancel.emit();
  }

  confirmDelete(){
    this.confirm.emit();
  }

}

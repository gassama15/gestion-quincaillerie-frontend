import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  @Input() categories: Category[];
  categoryModalOpen = false;
  selectedCategory: Category;
  delete = false;
  categoryToDelete: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onEdit(category: Category):void{
    this.categoryModalOpen = true;
    this.selectedCategory = category
  }

  onDelete(category: Category):void{
    // console.log("suppression ", category.idCategorie);
    this.delete = true;
    this.categoryToDelete = category;
  }

  addCategory(): void {
    this.selectedCategory = undefined;
    this.categoryModalOpen = true;
  }

  handleCancelDelete(){
    this.delete = false;
  }

  handleConfirmDelete(){
    this.categoryService.deleteCategory(this.categoryToDelete).subscribe(
      (data) => {
        console.log(data);

        // update frontend
        const index = this.categories.findIndex(c => c.idCategorie == this.categoryToDelete.idCategorie);
        this.categories.splice(index, 1);
      },
      (error) => {
        console.log(error);
      }
    );

    this.handleCancelDelete();
  }

  handleFinish(categorie){
    if (categorie) {
      // console.log(categorie);
      if (this.selectedCategory) {
        // Edit category
        categorie.idCategorie = this.selectedCategory.idCategorie;
        this.updateCategoryToServer(categorie);
      }else{
        // Add category
        this.addCategoryToServer(categorie);
      }
    }
    this.categoryModalOpen = false;
  }



  addCategoryToServer(categorie){
    this.categoryService.addCategory(categorie).subscribe(
      (response) => {
        // console.log(response);
        categorie.idCategorie = response.idCategorie
        this.categories.unshift(categorie);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCategoryToServer(categorie){
    this.categoryService.updateCategory(categorie).subscribe(
      (response) => {
        // console.log(response);
        // update frontend
        const index = this.categories.findIndex(c => c.idCategorie === categorie.idCategorie);
        this.categories = [
          ...this.categories.slice(0, index),
          categorie,
          ...this.categories.slice(index+1)
        ];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

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

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onEdit(category: Category):void{
    this.categoryModalOpen = true;
    this.selectedCategory = category
  }

  onDelete(category: Category):void{
    console.log("suppression ", category.idCategorie);
  }

  addCategory(): void {
    this.categoryModalOpen = true;
  }

  handleFinish(categorie){
    if (categorie) {
      console.log(categorie);
      if (this.selectedCategory) {
        // Edit category
      }else{
        // Add category
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
    }
    this.categoryModalOpen = false;
  }

}

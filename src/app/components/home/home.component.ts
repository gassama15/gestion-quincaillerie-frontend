import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories;
  categorySub;


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categorySub = this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

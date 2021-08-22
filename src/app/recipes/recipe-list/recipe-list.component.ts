import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Some Kind of Pasta', 'Lots of sugar', 'https://upload.wikimedia.org/wikipedia/commons/5/54/Pasta-2802156_1920.jpg'),
    new Recipe('Uh, brownies, I guess?', 'Hmm', 'https://pixnio.com/free-images/2017/06/08/2017-06-08-15-36-57.jpg')
  ];

  constructor() {}

  ngOnInit(): void {
  }

  onRecipeSelected(toShow: Recipe): void {
    this.recipeSelected.emit(toShow);
  }

}

import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeDetail: Recipe;
  showRecipeDetail = false;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(toShow: Recipe): void {
    this.recipeDetail = toShow;
    this.showRecipeDetail = true;
  }
}

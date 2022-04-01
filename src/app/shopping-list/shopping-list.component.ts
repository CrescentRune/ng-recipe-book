import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  //providers: [ShoppingListService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientsSub: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsSub = this.shoppingListService.ingredientsUpdate.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        // console.log("Event occurred!")
      }
    )
  }

  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
  }

  onIngredientAdded(newIng: Ingredient) {
    this.ingredients.push(newIng);
  }
}

import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipes.model";

@Injectable()
export class RecipesService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
            new Recipe(
                'Some Kind of Pasta',
                'Lots of sugar',
                'https://upload.wikimedia.org/wikipedia/commons/5/54/Pasta-2802156_1920.jpg',
                [
                    new Ingredient('Meat', 1),
                    new Ingredient('French Fries', 20)
                ]
            ),
            new Recipe(
                'Uh, brownies, I guess?',
                'Hmm',
                'https://coleycooks.com/wp-content/uploads/2016/12/UN3A9243.jpg',
                [
                    new Ingredient('Buns', 2),
                    new Ingredient('Meat', 1)
                ]
            )
        ];

    constructor(private shoppingListService: ShoppingListService) {

    }

    addItemsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipes() {
        return this.recipes.slice();
    }
}
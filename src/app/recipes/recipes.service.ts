import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipes.model";

@Injectable()
export class RecipesService {

    recipesUpdate = new Subject<Recipe[]>();

    private recipes: Recipe[] = []
    // private recipes: Recipe[] = [
    //         new Recipe(
    //             'Some Kind of Pasta',
    //             'Lots of sugar',
    //             'https://upload.wikimedia.org/wikipedia/commons/5/54/Pasta-2802156_1920.jpg',
    //             [
    //                 new Ingredient('Meat', 1),
    //                 new Ingredient('French Fries', 20)
    //             ]
    //         ),
    //         new Recipe(
    //             'Uh, brownies, I guess?',
    //             'Hmm',
    //             'https://coleycooks.com/wp-content/uploads/2016/12/UN3A9243.jpg',
    //             [
    //                 new Ingredient('Buns', 2),
    //                 new Ingredient('Meat', 1)
    //             ]
    //         )
    //     ];

    constructor(private shoppingListService: ShoppingListService) {
        
    }

    addItemsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesUpdate.next(this.recipes.slice());
    }

    getRecipe(id: number): Recipe {
        // return { ...this.recipes[id] };
        return { ...this.recipes[id] };
    }

    deleteRecipe(id: number): void{
        this.recipes.splice(id, 1);
        this.recipesUpdate.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesUpdate.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesUpdate.next(this.recipes.slice());
    }
}
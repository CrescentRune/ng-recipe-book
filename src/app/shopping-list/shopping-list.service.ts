import { EventEmitter, Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { Ingredient } from "../shared/ingredient.model";


@Injectable()
export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]

    ingredientsUpdate = new EventEmitter<Ingredient[]>();

    constructor() {
    }


    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
       this.ingredients.push(ingredient);
       this.ingredientsUpdate.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ES6 Spread operator!
        this.ingredients.push(...ingredients);
        this.ingredientsUpdate.emit(this.ingredients.slice());
    }
}
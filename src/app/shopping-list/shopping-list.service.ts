import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]

    ingredientsUpdate = new Subject<Ingredient[]>();

    constructor() {
    }


    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
       this.ingredients.push(ingredient);
       this.ingredientsUpdate.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ES6 Spread operator!
        this.ingredients.push(...ingredients);
        this.ingredientsUpdate.next(this.ingredients.slice());
    }
}
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
    startedEditing = new Subject<number>();

    constructor() {
    }


    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
       this.ingredients.push(ingredient);
       this.ingredientsUpdate.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsUpdate.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ES6 Spread operator!
        this.ingredients.push(...ingredients);
        this.ingredientsUpdate.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsUpdate.next(this.ingredients.slice());
    }

    onEditItem(index: number) {
        this.startedEditing.next(index);
    }
}
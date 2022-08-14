import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map, tap } from "rxjs/operators";

import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipes.model";


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipesService: RecipesService
    ) {}
    
    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put(
            'https://ng-complete-guide-cf9d1-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe();
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-complete-guide-cf9d1-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ingredients: [],
                            ...recipe
                        }
                    });
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            )
    }

}
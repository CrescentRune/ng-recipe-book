import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipes.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipesService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();

        this.http.put('https://ng-complete-guide-cf9d1-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe((response) => console.log(response));
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://ng-complete-guide-cf9d1-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    })
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            );
    }
}
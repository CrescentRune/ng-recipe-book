import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map, tap } from "rxjs/operators";

import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipes.model";
import { environment } from "src/environments/environment";


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
            `${environment.GOOGLE_API_URL}/recipes.json`,
            recipes
        ).subscribe();
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(`${environment.GOOGLE_API_URL}/recipes.json`)
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
import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../recipes.model";
import { RecipesService } from "../recipes.service";


@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
    @Input() recipe: Recipe;
    @Input() id: number;
    ngOnInit(): void {

    }

    constructor(private recipesService: RecipesService) {

    }

    onAddToShoppingList() {
        this.recipesService.addItemsToShoppingList(this.recipe.ingredients);
    }
}
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Recipe } from "../../recipes.model";
import { RecipesService } from "../../recipes.service";


@Component({
    selector: 'app-recipe-item',
    styleUrls: ['./recipe-item.component.css'],
    templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe: Recipe;
    //@Output() recipeSelected = new EventEmitter<Recipe>();
    constructor(private recipesService: RecipesService) {

    }

    ngOnInit(): void {

    }

    onSelected(): void {
        // this.recipeSelected.emit(this.recipe); 
        console.log('Selected!!');
        this.recipesService.recipeSelected.emit(this.recipe);
    }
}
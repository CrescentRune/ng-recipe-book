import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Recipe } from "../../recipes.model";


@Component({
    selector: 'app-recipe-item',
    styleUrls: ['./recipe-item.component.css'],
    templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe: Recipe;
    @Output() recipeSelected = new EventEmitter<Recipe>();
    constructor() {

    }

    ngOnInit(): void {

    }

    selectRecipe(): void {
        this.recipeSelected.emit(this.recipe);        
    }
}
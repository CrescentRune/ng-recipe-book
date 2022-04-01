import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../../recipes.model";
import { RecipesService } from "../../recipes.service";


@Component({
    selector: 'app-recipe-item',
    styleUrls: ['./recipe-item.component.css'],
    templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe: Recipe;
    @Input() id: number;
    //@Output() recipeSelected = new EventEmitter<Recipe>();
    constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {

    }

    // onSelected(): void {
    //     // this.recipeSelected.emit(this.recipe); 
    //     console.log('Selected!!');
    //     this.router.navigate([this.id], {relativeTo: this.route});
    //     // this.recipesService.recipeSelected.emit(this.recipe);
    // }
}
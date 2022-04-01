import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../recipes.model";
import { RecipesService } from "../recipes.service";


@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
    // @Input() recipe: Recipe;
    private recipeSub: Subscription; 
    id: number;
    recipe: Recipe;
    // @Input() id: number;
    ngOnInit(): void {

        this.recipeSub = this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.recipe = this.recipesService.getRecipes()[+params['id']];
        })
        
    }

    ngOnDestroy(): void {
        if (this.recipeSub) {
            this.recipeSub.unsubscribe();
            this.recipeSub = null;
        }
    }

    constructor(private recipesService: RecipesService, private route: ActivatedRoute) {

    }

    onAddToShoppingList() {
        this.recipesService.addItemsToShoppingList(this.recipe.ingredients);
    }
}
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    //@Output() ingredientAdded = new EventEmitter<Ingredient>();
    @ViewChild('f', {static: false}) slForm: NgForm;

    private subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;
    editedItemIndex: number;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
            }
        );
    }

    onSubmit(form: NgForm) {
       //this.ingredientAdded.emit(new Ingredient(name, amount));
        const value = form.value;
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, this.slForm.value)
        }
        else {
            this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
        }
        this.onClear();
    }
    
    onClear() {
        this.resetForm();
        this.clearEditItem();
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    resetForm() {
        this.slForm.resetForm();
    }

    clearEditItem() {
        this.editMode = false;
        this.editedItemIndex = -1;
        this.editedItem = null;
    }
}
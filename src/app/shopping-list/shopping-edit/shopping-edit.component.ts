import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
    @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    ngOnInit(): void {
        
    }

    addIngredient(name: string, amount: number) {
       this.ingredientAdded.emit(new Ingredient(name, amount));
       this.nameInputRef.nativeElement.value = '';
       this.amountInputRef.nativeElement.value = '';
    }
}
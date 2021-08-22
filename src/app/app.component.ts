import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showRecipes: boolean = true;
  showShopping: boolean = false;

  title = 'recipe-book';

  onNavChanged(section: string) {
    if (section === 'shopping') {
      this.showRecipes = false;
      this.showShopping = true;
    }
    else if (section === 'recipes') {
      this.showRecipes = true;
      this.showShopping = false;
    }
  }
}

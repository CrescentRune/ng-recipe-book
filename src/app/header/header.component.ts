import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  @Output('newNavSelected') navSelected = new EventEmitter<string>();
  state: string;
  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipes(): void {
    if (this.state !== 'recipes') {
      this.state = 'recipes';
      this.navSelected.emit('recipes');
    }
  }

  onSelectShopping(): void {
    if (this.state !== 'shopping') {
      this.state = 'shopping';
      this.navSelected.emit('shopping');
    }
  }

}

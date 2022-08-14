import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;

  @Output('newNavSelected') navSelected = new EventEmitter<string>();
  state: string;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
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

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut(): void {
    this.authService.logOut();
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DemoNgZorroModule } from "./demo-ng-zorro.module";
import { UserStorage } from './modules/shared/auth/services/user-storage'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    NzLayoutModule, 
    NzGridModule, 
    DemoNgZorroModule, 
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'quizWeb';

  isUserLoggedIn: boolean = UserStorage.isUserLoggedIn();
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isUserLoggedIn = UserStorage.isUserLoggedIn();
        this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
      }
    });
  }

  logout(){
    UserStorage.signOut();
    this.router.navigateByUrl('login');
  }
}

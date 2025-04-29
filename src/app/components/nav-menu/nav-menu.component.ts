import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  standalone: false
})
export class NavMenuComponent {
  constructor(public router: Router, public authService: AuthService) {}

  public loginLogout(): void {
    if (this.authService.accessToken) {
      // logout
      this.router.navigate(['auth/login']);
      this.authService.logout();
    } else {
      // login
      this.router.navigate(['auth/login']);
    }
  }
}

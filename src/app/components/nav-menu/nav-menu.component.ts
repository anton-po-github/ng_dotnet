import { Component } from '@angular/core';

import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  standalone: false
})
export class NavMenuComponent {
  public isExpanded = true;

  constructor(
    public sharedService: SharedService,
    private accountService: AccountService,
    private router: Router
  ) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public loginLogout(): void {
    if (this.sharedService.token) {
      // logout
      this.accountService.logout();
    } else {
      // login
      this.router.navigate(['auth/login']);
    }
  }
}

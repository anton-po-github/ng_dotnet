import { Component } from '@angular/core';
import { AccountService } from './components/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  constructor(private accountService: AccountService, private router: Router) {
    if (localStorage.getItem('postgre-token')) {
      this.accountService
        .loadCurrentUser(localStorage.getItem('postgre-token'))
        .subscribe();
    } else {
      this.router.navigateByUrl('auth/login');
    }
  }
}

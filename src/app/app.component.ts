import { Component } from '@angular/core';
import { AccountService } from './components/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  constructor(private accountService: AccountService) {
    this.accountService
      .loadCurrentUser(localStorage.getItem('postgre-token'))
      .subscribe();
  }
}

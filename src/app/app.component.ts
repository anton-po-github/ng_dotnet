import { Component, OnInit } from '@angular/core';
import { AccountService } from './components/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private accountService: AccountService){}
 
  ngOnInit(): void {
    this.accountService.loadCurrentUser(localStorage.getItem('token')).subscribe();
  }
}

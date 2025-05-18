import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  constructor(private router: Router) {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigateByUrl('auth/login');
    }
  }
}

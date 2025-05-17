import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: `.spacer {
    flex: 1 1 auto;
  }`,
  standalone: false
})
export class AppComponent {
  themeClass = 'light-theme'; // по умолчанию светлая тема

  constructor(private router: Router, private themeService: ThemeService) {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigateByUrl('auth/login');
    }
  }

  toggleTheme() {
    this.themeClass =
      this.themeClass === 'light-theme' ? 'dark-theme' : 'light-theme';
  }

  /*  toggleTheme() {
    this.themeService.switchTheme('dark');

    console.log(this.themeService.currentTheme());
  } */
}

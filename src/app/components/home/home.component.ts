import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false
})
export class HomeComponent {
  constructor(
    private themeService: ThemeService,
    private homeService: HomeService
  ) {
    this.homeService.getIdentityUsers().subscribe({
      next: (result) => {},
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        // this.showLoader = false;
      }
    });

    /*  this.homeService.getTriggerError().subscribe({
      next: (result) => {},
      error: (err) => {
      },
      complete: () => {
      }
    }); */
  }

  public getBgImageHome(): string {
    return this.themeService.theme === 'light-theme'
      ? 'url(' + '/assets/images/bg-login-light.png' + ')'
      : 'url(' + '/assets/images/bg-login-dark.png' + ')';
  }
}

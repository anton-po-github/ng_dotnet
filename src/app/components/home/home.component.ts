import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false
})
export class HomeComponent {
  constructor(private homeService: HomeService) {
    this.homeService.getIdentityUsers().subscribe({
      next: (result) => {},
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        // this.showLoader = false;
      }
    });
  }
}

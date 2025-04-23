import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.homeService.getIdentityUsers().subscribe({
        next: (result) => {},
        error: (err) => {
          console.error(err);
        },
        complete: () => {}
      });
    }, 1000);
  }
}

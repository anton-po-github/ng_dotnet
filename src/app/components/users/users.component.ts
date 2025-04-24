import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: false
})
export class UsersComponent {
  constructor(public sharedService: SharedService) {}
}

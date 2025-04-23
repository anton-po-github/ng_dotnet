import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { INewUser, UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  standalone: false
})
export class AddUpdateUserComponent implements OnInit {
  public titleAddUpdateUser = '';

  public newUser: INewUser = {
    firstName: '',
    lastName: '',
    email: '',
    photo: null
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('firstName')) {
      this.newUser.firstName = this.route.snapshot.paramMap.get('firstName');
      this.newUser.lastName = this.route.snapshot.paramMap.get('lastName');
      this.newUser.email = this.route.snapshot.paramMap.get('email');

      this.titleAddUpdateUser = 'Update User';
    } else {
      this.titleAddUpdateUser = 'Add User';
    }
  }

  public addUpdateUser(): void {
    if (this.route.snapshot.paramMap.get('firstName')) {
      this.usersService
        .updateUser(this.route.snapshot.paramMap.get('id'), this.newUser)
        .subscribe({
          next: (result) => {
            if (result.message === 'User updated') {
              this.router.navigate(['/users']);
            }
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            // this.showLoader = false;
          }
        });
    } else {
      this.usersService.addNewUser(this.newUser).subscribe({
        next: (result) => {
          if (result.message === 'User created') {
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          // this.showLoader = false;
        }
      });
    }
  }
}

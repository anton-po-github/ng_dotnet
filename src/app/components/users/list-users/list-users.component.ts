import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { IUsers, IUsersData, UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  standalone: false
})
export class ListUsersComponent implements OnInit {
  private usersSource = new Subject<Array<IUsersData>>();

  public users$ = this.usersSource.asObservable();

  public searchUsers = '';

  private resultIUsers = {} as IUsers;

  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.onGetUsers(`?sort=name&pageIndex=${1}&pageSize=4`);
    }, 300);
  }

  public updateUser(user: IUsers): void {
    this.router.navigate(['/users/add-update-user', user]);
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      next: (result) => {
        if (result.message === 'User deleted') {
          this.onGetUsers();
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

  public searchUsersBtn(): void {
    let pageIndex = this.resultIUsers.pageIndex;

    let paramsUsers = `?sort=name&pageIndex=${1}&pageSize3`;

    if (this.searchUsers) {
      paramsUsers += `&search=${this.searchUsers}`;
    }

    this.onGetUsers(paramsUsers);
  }

  public nextPrevUsers(type: string): void {
    let pageIndex = this.resultIUsers.pageIndex;

    if (type === 'next') {
      pageIndex++;
    } else {
      pageIndex--;
    }

    if (!pageIndex) {
      return;
    }

    let paramsUsers = `?sort=name&pageIndex=${pageIndex}&pageSize=4`;

    this.onGetUsers(paramsUsers);
  }

  private onGetUsers(params?: string): void {
    this.usersService.getUsers(params).subscribe({
      // type: IUsers
      next: (result: any) => {
        this.resultIUsers = result;

        result.data.forEach((d) => {
          d.details = JSON.parse(d.details as string);
        });

        this.usersSource.next(result.data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }
}

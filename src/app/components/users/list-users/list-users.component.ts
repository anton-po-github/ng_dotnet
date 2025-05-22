import { Component, OnInit, signal } from '@angular/core';

import { Subject } from 'rxjs';
import { IUsers, IUsersData, UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ColumnConfig } from '../../shared/components/universal-table/universal-table.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  standalone: false
})
export class ListUsersComponent implements OnInit {
  private usersSource$ = new Subject<Array<IUsersData>>();
  public users$ = this.usersSource$.asObservable();

  public searchUsers = '';
  private resultIUsers = {} as IUsers;

  public columnsUsers = signal<ColumnConfig[]>([
    { columnDef: 'icon', header: 'Icon', isTemplate: true },
    { columnDef: 'first_name', header: 'First Name', cell: (e) => e.firstName },
    {
      columnDef: 'last_name',
      header: 'Last Name',
      cell: (e) => `${e.lastName}`
    },
    { columnDef: 'email', header: 'Email', cell: (e) => e.email },
    { columnDef: 'phone', header: 'Phone', cell: (e) => e.phone },
    { columnDef: 'role', header: 'Role', cell: (e) => e.details.Role },
    { columnDef: 'actions', header: 'Actions', isAction: true }
  ]);

  public users: IUsers[] = [];

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

        this.users = [...result.data];

        this.usersSource$.next(result.data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }
}

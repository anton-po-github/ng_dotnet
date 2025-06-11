import { Component, inject, OnInit, signal } from '@angular/core';

import { Subject } from 'rxjs';
import {
  IUsers,
  IUsersData,
  IUsersDetails,
  UsersService
} from '../users.service';
import { Router } from '@angular/router';
import { ColumnConfig } from '../../shared/components/universal-table/universal-table.component';
import { MatDialog } from '@angular/material/dialog';
import {
  IUniversalDialogData,
  IUniversalDialogDataFields,
  UniversalDialogComponent
} from '../../shared/components/universal-dialog/universal-dialog.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  standalone: false
})
export class ListUsersComponent implements OnInit {
  private usersSource$ = new Subject<Array<IUsersData>>();
  public users$ = this.usersSource$.asObservable();
  dialog = inject(MatDialog);
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

  public users: IUsersData[] = [];

  private fieldsUsers = [
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', required: true },
    { name: 'role', label: 'Role', required: true },
    { name: 'photo', label: 'Photo', type: 'file' }
  ] as IUniversalDialogDataFields[];

  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.onGetUsers(`?sort=name&pageIndex=${1}&pageSize=4`);
    }, 300);
  }

  public editUser(user: IUsersData): void {
    const details = user.details as IUsersDetails;

    user.role = details.Role;

    const dialogData: IUniversalDialogData = {
      mode: 'update',
      typeDialog: 'User',
      fields: this.fieldsUsers,
      entity: user
    };

    this.dialog
      .open(UniversalDialogComponent, {
        width: '400px',
        data: dialogData
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          // Save to API or update state
        }
      });
  }

  public addUser(): void {
    const dialogData: IUniversalDialogData = {
      mode: 'create',
      typeDialog: 'User',

      fields: this.fieldsUsers
    };

    this.dialog
      .open(UniversalDialogComponent, {
        width: '400px',
        data: dialogData
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          // Save to API or update state
        }
      });
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
    this.usersService.getUsers(params ? params : '').subscribe({
      next: (result: IUsers) => {
        this.resultIUsers = result;

        result.data.forEach((d) => {
          d.details = JSON.parse(d.details as string);

          const details = d.details as IUsersDetails;

          d.role = details.Role;
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

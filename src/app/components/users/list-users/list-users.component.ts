import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { IUsers, UsersService } from '../users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  standalone: false
})
export class ListUsersComponent implements OnInit {

  private usersSource = new Subject<Array<IUsers>>();

  public users$ = this.usersSource.asObservable();

  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.onGetUsers();
  }

  public updateUser(user: IUsers): void {
    this.router.navigate(["/users/add-update-user", user])
  }

  public deleteUser(id: number): void {

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

  private onGetUsers(): void {

    this.usersService.getUsers().subscribe({
      next: (result) => {
       result.forEach(item => {
        item.details = JSON.parse(item.details as string)
       })

     //  result.

       this.usersSource.next(result)
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
       // this.showLoader = false;
      }
    })
  }

}

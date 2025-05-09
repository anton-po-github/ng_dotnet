import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUpdateUserComponent } from './add-update/add-update-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent
      },
      {
        path: 'add-update-user',
        component: AddUpdateUserComponent
      }
    ])
  ],
  declarations: [UsersComponent, ListUsersComponent, AddUpdateUserComponent]
})
export class UsersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AddUpdateBooksComponent } from './add-update-books/add-update-books.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksComponent
      },
      {
        path: 'add-update-book',
        component: AddUpdateBooksComponent
      }
    ])
  ],
  declarations: [BooksComponent, AddUpdateBooksComponent]
})
export class BooksModule {}

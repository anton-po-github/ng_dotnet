import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBook } from '../books.component';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-add-update-books',
  templateUrl: './add-update-books.component.html',
  standalone: false
})
export class AddUpdateBooksComponent implements OnInit {
  public titleAddUpdateBook = '';

  public newMyBook: IBook = {
    id: null,
    bookName: null,
    price: null,
    category: null,
    author: null,
    icon: null,
    iconId: null
  };

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('bookName')) {
      this.newMyBook.bookName = this.route.snapshot.paramMap.get('bookName');
      this.newMyBook.price = +this.route.snapshot.paramMap.get('price');
      this.newMyBook.category = this.route.snapshot.paramMap.get('category');
      this.newMyBook.author = this.route.snapshot.paramMap.get('author');
      this.newMyBook.id = this.route.snapshot.paramMap.get('id');

      this.titleAddUpdateBook = 'Update Book';
    } else {
      this.titleAddUpdateBook = 'Add Book';
    }
  }

  public addUpdateUser(): void {
    if (this.route.snapshot.paramMap.get('bookName')) {
      this.updateOneBook(this.newMyBook.id);
    } else {
      this.addOneBook();
    }
  }

  public addOneBook(): void {
    this.booksService.addOneBook(this.newMyBook).subscribe({
      next: (result: IBook) => {
        console.log(result);

        if (result.id) {
          this.router.navigate(['/books']);
        }

        this.resetNewMyBook();
        this.booksService.onGetAllBooks$.next(true);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }

  public updateOneBook(bookId: string): void {
    this.booksService.updateOneBook(bookId, this.newMyBook).subscribe({
      next: (result: IBook) => {
        console.log(result);

        if (result.id) {
          this.router.navigate(['/books']);
        }

        this.resetNewMyBook();
        this.booksService.onGetAllBooks$.next(true);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }

  private resetNewMyBook(): void {
    this.newMyBook = {
      id: null,
      bookName: null,
      author: null,
      category: null,
      price: null,
      iconId: null,
      icon: null
    };
  }
}

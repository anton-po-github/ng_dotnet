import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BooksService, IBook } from '../books.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-update-books',
  templateUrl: './add-update-books.component.html',
  standalone: false
})
export class AddUpdateBooksComponent implements OnInit {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public booksService: BooksService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('bookName')) {
      this.booksService.newBook.bookName =
        this.route.snapshot.paramMap.get('bookName');
      this.booksService.newBook.price =
        +this.route.snapshot.paramMap.get('price');
      this.booksService.newBook.category =
        this.route.snapshot.paramMap.get('category');
      this.booksService.newBook.author =
        this.route.snapshot.paramMap.get('author');
      this.booksService.newBook.id = this.route.snapshot.paramMap.get('id');
    }
  }

  public addUpdateBook(): void {
    if (this.route.snapshot.paramMap.get('bookName')) {
      this.updateOneBook(this.booksService.newBook.id);
    } else {
      this.addOneBook();
    }
  }

  public addOneBook(): void {
    this.booksService
      .addOneBook(this.booksService.newBook)
      .pipe(first())
      .subscribe({
        next: () => {
          this.booksService.resetNewMyBook();
          this.router.navigate(['/books']);
        },
        error: (err) => console.error(err)
      });
  }

  public updateOneBook(bookId: string): void {
    this.booksService
      .updateOneBook(bookId, this.booksService.newBook)
      .pipe(first())
      .subscribe({
        next: () => {
          this.booksService.resetNewMyBook();
          this.router.navigate(['/books']);
        },
        error: (err) => console.error(err)
      });
  }
}

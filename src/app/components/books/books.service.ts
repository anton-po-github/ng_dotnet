import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  from,
  mergeMap,
  Observable,
  tap,
  throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface IBook {
  id?: string;
  bookName: string;
  price?: number;
  category: string;
  author: string;
  type_file: string;
  iconBase64: string;
  iconFileName: string;
  icon?: File;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public newBook: IBook = {
    id: null,
    bookName: null,
    price: null,
    author: null,
    category: null,
    iconBase64: null,
    type_file: null,
    iconFileName: null,
    icon: null
  };

  public onGetAllBooks$ = new BehaviorSubject<boolean>(true);

  private booksUrl = environment.baseUrl + 'api/books';

  constructor(private http: HttpClient, private router: Router) {}

  public getAllBooks(): Observable<Array<IBook>> {
    return this.http.get<Array<IBook>>(this.booksUrl);
  }

  public deleteBook(bookId: string): Observable<boolean> {
    return this.http.delete<any>(this.booksUrl + `/${bookId}`);
  }

  public addOneBook(newBook: IBook): Observable<IBook> {
    return this.saveBook(undefined, newBook);
  }

  public updateOneBook(bookId: string, newBook: IBook): Observable<IBook> {
    return this.saveBook(bookId, newBook);
  }

  private saveBook(bookId: string | undefined, book: IBook): Observable<IBook> {
    return from(this.setNewBook(book)).pipe(
      mergeMap((preparedBook) => {
        const url = bookId
          ? `${this.booksUrl}/${bookId}` // для PUT
          : this.booksUrl; // для POST

        // выбираем метод по условию
        return bookId
          ? this.http.put<IBook>(url, preparedBook)
          : this.http.post<IBook>(url, preparedBook);
      }),
      tap(() => this.onGetAllBooks$.next(true)),
      catchError((err) => throwError(() => err))
    );
  }

  private async setNewBook(newBook: IBook): Promise<IBook> {
    try {
      newBook.iconBase64 = await this.fileToBase64(newBook.icon);
    } catch (error) {
      console.error(error);
    }

    newBook.iconFileName = newBook.icon.name;
    newBook.type_file = newBook.icon.type;

    delete newBook.id;
    delete newBook.icon;

    return newBook;
  }

  public resetNewMyBook(): void {
    this.newBook = {
      id: null,
      bookName: null,
      author: null,
      category: null,
      price: null,
      iconBase64: null,
      type_file: null,
      iconFileName: null,
      icon: null
    };
  }

  private async fileToBase64(file: File): Promise<string> {
    if (!file) {
      return;
    }

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };

      reader.onerror = (error) => reject(error);
    });
  }
}

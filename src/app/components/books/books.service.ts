import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

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

  public async addOneBook(newBook: IBook): Promise<any> {
    newBook = await this.setNewBook(newBook);

    this.http.post<any>(this.booksUrl, newBook).subscribe({
      next: (result: IBook) => {
        if (result.id) {
          this.router.navigate(['/books']);
        }

        this.resetNewMyBook();
        this.onGetAllBooks$.next(true);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }

  public async updateOneBook(bookId, newBook: IBook): Promise<any> {
    newBook = await this.setNewBook(newBook);

    this.http.put<IBook>(this.booksUrl + `/${bookId}`, newBook).subscribe({
      next: (result: IBook) => {
        if (result.id) {
          this.router.navigate(['/books']);
        }

        this.resetNewMyBook();
        this.onGetAllBooks$.next(true);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }

  public uploadFile(file: FormData): Observable<any> {
    return this.http.post<any>(this.booksUrl + `file`, file, {
      reportProgress: true
    });
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

  private resetNewMyBook(): void {
    console.log('resetNewMyBook');

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

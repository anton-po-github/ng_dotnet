import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { IBook } from './books.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public onGetAllBooks$ = new BehaviorSubject<boolean>(true);

  private booksUrl = environment.baseUrl + 'api/books';

  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<Array<IBook>> {
    return this.http.get<Array<IBook>>(this.booksUrl);
  }

  public deleteBook(bookId: string): Observable<boolean> {
    return this.http.delete<any>(this.booksUrl + `/${bookId}`);
  }

  /*addOneBook(newBook: IBook, file: FormData): Observable<any> {
    return this.http.post<any>(this.url + `books`, {newBook, file}, {headers: this.httpHeaders});
  }*/

  public addOneBook(newBook: IBook): Observable<IBook> {
    const formData: FormData = new FormData();

    formData.append('icon', newBook.icon);

    delete newBook.id;
    delete newBook.icon;

    formData.append('body', JSON.stringify(newBook));

    return this.http.post<any>(this.booksUrl, formData);
  }

  public updateOneBook(bookId, newBook: IBook): Observable<IBook> {
    return this.http.put<any>(this.booksUrl + `/${bookId}`, newBook);
  }
  // for a collection MyBooks

  /* uploadFile(file: FormData): Observable<any> {
     return this.http.post<any>(this.url + `api/upload`, file, {
       reportProgress: true,
     });
   }*/
  public uploadFile(file: FormData): Observable<any> {
    return this.http.post<any>(this.booksUrl + `file`, file, {
      reportProgress: true
    });
  }

  private _toFormData(data): FormData {
    const fd = new FormData();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      fd.append(key, data[key]);
    });
    return fd;
  }
}

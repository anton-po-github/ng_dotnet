import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from './books.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = environment.baseUrl + 'api/books';

  protected httpHeaders: HttpHeaders = new HttpHeaders();
  protected httpHeadersForm: HttpHeaders = new HttpHeaders();
  protected httpHeadersFormData: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.httpHeaders.append('Content-Type', 'application/json, charset=utf-8');
    this.httpHeadersForm.append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    this.httpHeadersFormData.append('Content-Type', 'multipart/form-data');
  }

  getAllBooks(): Observable<Array<IBook>> {
    /*  let headers = new HttpHeaders();

    headers = headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('mongo-token')}`
    ); */

    // return this.http.get<Array<IBook>>(this.url + 'books', { headers });
    return this.http.get<Array<IBook>>(this.booksUrl);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete<any>(this.booksUrl + `/${bookId}`, {
      headers: this.httpHeaders
    });
  }

  /*addOneBook(newBook: IBook, file: FormData): Observable<any> {
    return this.http.post<any>(this.url + `books`, {newBook, file}, {headers: this.httpHeaders});
  }*/

  addOneBook(newBook: IBook): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('icon', newBook.icon);

    delete newBook.id;
    delete newBook.icon;

    formData.append('body', JSON.stringify(newBook));

    return this.http.post<any>(this.booksUrl, formData, {
      headers: this.httpHeadersFormData
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

  updateOneBook(bookId, newBook: IBook): Observable<any> {
    return this.http.put<any>(this.booksUrl + `/${bookId}`, newBook, {
      headers: this.httpHeaders
    });
  }
  // for a collection MyBooks

  /* uploadFile(file: FormData): Observable<any> {
     return this.http.post<any>(this.url + `api/upload`, file, {
       reportProgress: true,
     });
   }*/
  uploadFile(file: FormData): Observable<any> {
    return this.http.post<any>(this.booksUrl + `file`, file, {
      reportProgress: true
    });
  }
}

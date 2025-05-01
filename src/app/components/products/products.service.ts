import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from './products.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public onGetAllProducts$ = new BehaviorSubject<boolean>(true);

  private productsUrl =
    'https://anton-mysql-app.azurewebsites.net/api/products';

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.productsUrl);
  }

  public deleteProduct(bookId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      this.productsUrl + `/${bookId}`
    );
  }

  public addOneProduct(newBook: IProduct): Observable<{ message: string }> {
    delete newBook.id;
    return this.http.post<any>(this.productsUrl, newBook);
  }

  public updateOneProduct(
    productId: string,
    newBook: IProduct
  ): Observable<{ message: string }> {
    return this.http.put<any>(this.productsUrl + `/${productId}`, newBook);
  }
}

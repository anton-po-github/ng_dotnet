import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = environment.baseUrl + 'api/account/all';

  constructor(private http: HttpClient) {}

  public getIdentityUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
  userName: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  postgreUrl = environment.baseUrl;
  // register in postman
  mongoLoginUrl = 'http://localhost:5325/api/v1/authenticate/login';

  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public loadCurrentUser(token: string | null) {
    if (token == null) {
      this.currentUserSource.next(null);

      return of(null);
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .get<IUser>(this.postgreUrl + 'api/account/GetCurrentUser', { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('postgre-token', user.token);
            //localStorage.setItem('mongo-token', user.accessToken as any);

            this.currentUserSource.next(user);

            return user;
          } else {
            return null;
          }
        })
      );
  }

  login(values: any) {
    // return this.http.post<any>(this.mongoLoginUrl, values).pipe(
    return this.http
      .post<any>(this.postgreUrl + 'api/account/login', values)
      .pipe(
        map((any) => {
          localStorage.setItem('postgre-token', any.token);
          // localStorage.setItem('mongo-token', any.accessToken);

          // this.currentUserSource.next(any);
        })
      );
  }

  register(values: any) {
    return this.http
      .post<any>(this.postgreUrl + 'api/account/register', values)
      .pipe(
        map((any) => {
          this.currentUserSource.next(any);
        })
      );
  }

  logout() {
    localStorage.removeItem('postgre-token');

    this.currentUserSource.next(null);

    this.router.navigateByUrl('auth/login');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(
      this.postgreUrl + 'account/emailExists?email=' + email
    );
  }

  getanyAddress() {
    return this.http.get<any>(this.postgreUrl + 'account/address');
  }

  updateanyAddress(address: any) {
    return this.http.put(this.postgreUrl + 'account/address', address);
  }
}

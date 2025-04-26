import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../shared/shared.service';

export interface IUser {
  email: string;
  userName: string;
  token: string;
  role: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public bearerToken = '';
  public postgreUrl = environment.baseUrl;

  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  public loadCurrentUser(token: string | null) {
    if (!token) {
      this.currentUserSource.next(null);

      return of(null);
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .get<IUser>(this.postgreUrl + 'api/account/current', { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('postgre-token', user.token);
            this.bearerToken = user.token;
            //localStorage.setItem('mongo-token', user.accessToken as any);

            this.currentUserSource.next(user);

            return user;
          } else {
            return null;
          }
        })
      );
  }

  public login(values: any) {
    return this.http
      .post<IUser>(this.postgreUrl + 'api/account/login', values)
      .pipe(
        map((user) => {
          localStorage.setItem('postgre-token', user.token);

          this.sharedService.postgreToken = user.token;
        })
      );
  }

  public register(values: any) {
    return this.http
      .post<any>(this.postgreUrl + 'api/account/register', values)
      .pipe(
        map((any) => {
          this.currentUserSource.next(any);
        })
      );
  }

  public logout() {
    localStorage.removeItem('postgre-token');

    this.currentUserSource.next(null);

    this.router.navigateByUrl('auth/login');
  }

  public checkEmailExists(email: string) {
    return this.http.get<boolean>(
      this.postgreUrl + 'account/emailExists?email=' + email
    );
  }

  public getanyAddress() {
    return this.http.get<any>(this.postgreUrl + 'account/address');
  }

  public updateanyAddress(address: any) {
    return this.http.put(this.postgreUrl + 'account/address', address);
  }
}

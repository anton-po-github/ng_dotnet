import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  BehaviorSubject,
  timer,
  Subscription,
  switchMap,
  tap,
  map,
  catchError,
  EMPTY
} from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { ThemeService } from './../../services/theme.service';

export interface IUser {
  email: string;
  userName: string;
  token: string;
  role: string[];
}

export interface ILoggedUser {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public accessToken = localStorage.getItem('accessToken');

  private autUrl = environment.baseUrl + 'api/account';

  private accessToken$ = new BehaviorSubject<string | null>(null);

  private refreshToken: string | null = null;

  private refreshSub!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.loadTokens();
  }

  public getBgImageLogin(): string {
    return this.themeService.theme === 'light-theme'
      ? 'url(' + '/assets/images/bg-login-light2.png' + ')'
      : 'url(' + '/assets/images/bg-login-dark2.png' + ')';
  }

  public login(credentials: { email: string; password: string }) {
    return this.http
      .post<ILoggedUser>(`${this.autUrl}/login`, credentials)
      .pipe(tap((res) => this.setTokens(res)));
  }

  public register(values: ILoginForm) {
    return this.http
      .post<any>(this.autUrl + '/register', values)
      .pipe(map((any) => {}));
  }

  public logout() {
    this.clearTokens();
  }

  public getAccessToken() {
    return this.accessToken$.value;
  }

  public checkEmailExists(email: string) {
    return this.http.get<boolean>(this.autUrl + '/emailexists?email=' + email);
  }

  public refresh() {
    const currentAccess = this.accessToken$.value;

    return this.http
      .post<ILoggedUser>(`${this.autUrl}/refresh`, {
        accessToken: currentAccess,
        refreshToken: this.refreshToken
      })
      .pipe(tap((res) => this.setTokens(res)));
  }

  private setTokens(res: ILoggedUser) {
    this.accessToken$.next(res.accessToken);

    this.accessToken = res.accessToken;

    this.refreshToken = res.refreshToken;

    localStorage.setItem('accessToken', res.accessToken);

    localStorage.setItem('refreshToken', res.refreshToken);

    this.scheduleRefresh();
  }

  private loadTokens() {
    const at = localStorage.getItem('accessToken');

    const rt = localStorage.getItem('refreshToken');

    if (at && rt) {
      this.accessToken$.next(at);

      this.refreshToken = rt;

      this.scheduleRefresh();
    }
  }

  private clearTokens() {
    this.accessToken$.next(null);
    this.refreshToken = null;

    this.accessToken = '';

    localStorage.removeItem('accessToken');

    localStorage.removeItem('refreshToken');

    if (this.refreshSub) this.refreshSub.unsubscribe();

    this.router.navigateByUrl('auth/login');
  }

  private scheduleRefresh() {
    if (this.refreshSub) this.refreshSub.unsubscribe();

    const token = this.accessToken$.value!;
    const expDate = jwtDecode<{ exp: number }>(token).exp * 1000;
    const ahead = expDate - Date.now() - 2 * 60 * 1000;

    this.refreshSub = timer(Math.max(ahead, 0))
      .pipe(
        switchMap(() => this.refresh()),
        catchError((err) => {
          console.error('Авто-refresh упал:', err);
          return EMPTY; // не разрываем стрим
        })
      )
      .subscribe();
  }
}

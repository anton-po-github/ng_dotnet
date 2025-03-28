import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { AccountService } from '../components/account/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private token?: string;

  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.token = user?.token;
      }
    });
    // this is a working code, but when UI works with mongo and postgres at the same time, then the token must be different to receive data
    if (this.token) {
      /*  request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      }) */
    }

    return next.handle(request);
  }
}

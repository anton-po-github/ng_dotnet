import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AccountService } from '../components/account/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // this is a working code, but when UI works with mongo and postgres at the same time, then the token must be different to receive data
    if (this.accountService.bearerToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accountService.bearerToken}`
        }
      });
    }

    return next.handle(request);
  }
}

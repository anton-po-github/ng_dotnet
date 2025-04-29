import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req, next) {
    const publicPaths = [
      '/api/account/login',
      '/api/account/register',
      '/api/account/emailexists',
      '/api/account/refresh'
    ];
    if (publicPaths.some((p) => req.url.endsWith(p))) {
      return next.handle(req);
    }

    /*  if (req.url.endsWith('/api/account/refresh')) {
      return next.handle(req);
    } */

    const token = this.auth.getAccessToken();

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(authReq);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { map, catchError, Observable, throwError, from, switchMap } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (
          error.error?.message ===
          'An exception has been raised that is likely due to a transient failure.'
        ) {
          // make re-request the last API if Azure return this error
          return from(
            new Promise<Observable<HttpEvent<any>>>((resolve) =>
              setTimeout(() => resolve(next.handle(req)), 1000)
            )
          ).pipe(switchMap((retryRequest$) => retryRequest$));
        }

        return throwError(() => error);
      })
    );
  }
}

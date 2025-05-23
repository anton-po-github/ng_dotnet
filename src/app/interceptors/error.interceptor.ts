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

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // public errorDialog = {} as MatDialogRef<ErrorDialogComponent>;
  public isOpenErrorDialog = false;

  constructor(private dialog: MatDialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //

          console.log(event);

          if (event.body && event.body.error) {
            const data = {
              text: `The server responded with an error (status ${event.body.status_code}):`,
              data: event.body
            };
            // this.openErrorDialog(data);
          }
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        //
        const data = {
          text: `The server responded with an error (status ${error.status}):`,
          data: error.error
        };

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

        // this.openErrorDialog(data);

        return throwError(() => error);
      })
    );
  }

  /*   private openErrorDialog(data: IErrorDialog): void {
    if (this.isOpenErrorDialog) {
      console.error(data);

      return;
    }

    this.errorDialog = this.dialog.open(ErrorDialogComponent, {
      width: '480px',
      data,
      autoFocus: false
    });

    this.isOpenErrorDialog = true;

    this.errorDialog
      .afterClosed()
      .subscribe((result) => (this.isOpenErrorDialog = false));
  } */
}

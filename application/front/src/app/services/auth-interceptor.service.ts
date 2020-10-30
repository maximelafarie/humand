import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { TokenStorageService } from './token-storage.service';

import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.buildHeaders(req);

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.tokenStorageService.disconnect();
            this.router.navigate(['/auth/login']);
          }

          return observableThrowError(err);
        }
      })
    );
  }

  private buildHeaders(req: HttpRequest<any>): HttpRequest<any> {
    let newHeaders: HttpHeaders = req.headers;
    const setParams = {};

    if (!newHeaders.get('Accept')) {
      newHeaders = newHeaders.set('Accept', 'application/ld+json');
    }

    if (!newHeaders.get('Content-Type')) {
      newHeaders = newHeaders.set('Content-Type', 'application/json');
    }

    if (this.tokenStorageService.hasToken('auth_token')) {
      newHeaders = newHeaders.set('Authorization', 'Bearer ' + this.tokenStorageService.getToken('auth_token'));
    }

    return req.clone({ headers: newHeaders, setParams });
  }
}

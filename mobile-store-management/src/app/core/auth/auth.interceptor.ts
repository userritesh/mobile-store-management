import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshing = false;
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err?.status === 401 && !this.refreshing) {
          this.refreshing = true;
          return from(this.auth.refresh()).pipe(
            switchMap((ok) => {
              this.refreshing = false;
              if (ok) {
                const newToken = this.auth.getAccessToken();
                const retry = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
                return next.handle(retry);
              }
              throw err;
            }),
          );
        }
        throw err;
      }),
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

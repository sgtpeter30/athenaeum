import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Token, UserService } from "./user.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class RefreshInterceptorService implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private queue: ((token: Token) => void)[] = []

  constructor(
    @Inject('BASE_API_URL') 
    private baseUrl: string,
    private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) return throwError(() => err);

        const refreshToken = this.userService.getToken()?.refreshToken
        if (!refreshToken || refreshToken === "") {
          return throwError(() => err)
        }

        if (this.isRefreshing) {
          return new Observable<HttpEvent<any>>((observer) => {
            this.queue.push((token: Token) => {
              next.handle(req.clone({
                setHeaders: { Authorization: "Bearer " + token?.accessToken },
                url: `${this.baseUrl}/${req.url}`
              })).subscribe({
                next: (event) => observer.next(event),
                error: (e) => observer.error(e),
                complete: () => observer.complete()
              });
            })
          })
        }

        this.isRefreshing = true;

        return this.userService.refreshTokenRequest().pipe(
          switchMap((res: any) => {
            this.isRefreshing = false;

            if (!res) return throwError(() => err);

            this.userService.setToken(res)

            this.queue.forEach((cb) => cb(res));
            this.queue = [];

            return next.handle(
              req.clone({
                setHeaders: { Authorization: "Bearer " + res?.accessToken },
                url: `${this.baseUrl}/${req.url}`
              })
            )
          }),
          catchError((refreshError) => {
            this.isRefreshing = false;
            return throwError(() => refreshError);
          })
        )

      })
    )
  }
}
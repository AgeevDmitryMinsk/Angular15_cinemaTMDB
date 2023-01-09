import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if (request.url.includes('https://api.themoviedb.org/3')) {
      const paramReq = request.clone({
        params: request.params.set(
          'api_key',
          '261986cbb51c934516a9889245136067'
        )
      });
      return next.handle(paramReq);
    } else {
      return next.handle(request);
    }
  }
}

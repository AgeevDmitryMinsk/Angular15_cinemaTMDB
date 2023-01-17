import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if (request.url.includes('https://api.themoviedb.org/3')) {
      const paramReq = request.clone({
        params: request.params.set(
          'api_key',
          environment.API_KEY
        )
      });
      return next.handle(paramReq);
    } else {
      return next.handle(request);
    }
  }
}

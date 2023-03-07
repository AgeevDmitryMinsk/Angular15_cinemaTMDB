import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../services/data.service";



@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  languageInInterceptor: string
  constructor(private toastr: ToastrService,
              public dataService: DataService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    this.dataService.languageSelected.subscribe({
      next(x) {
        // @ts-ignore
        this.languageInInterceptor = x.language
        console.log('got value ' + x.language);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });

    if (request.url.includes('https://api.themoviedb.org/3')) {
      let paramReq = request.clone({
        params: request.params.set(
          'api_key',
          environment.API_KEY
        // ).append('language', 'ru')
      ).append('language', this.languageInInterceptor)
      });
      paramReq = paramReq.clone({

      })
      return next.handle(paramReq)
        //add check errors into interceptor
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
              console.log('1 This is client side error FROM HttpInterceptor');
              errorMsg = `Error: ${error.error.message}`;
            } else {
              console.log('1 This is server side error');
              if (error.status ===0) errorMsg = `TrY To UsE V_P_N`
              else if (error.status ===404) errorMsg = `404 Page Not Found`
              else errorMsg = `1 Error Code Status FROM HttpInterceptor: ${error.status},  Message: ${error.message}`;
              this.showErrorToastr(errorMsg)
            }
            console.log(errorMsg);
            return  throwError(() => new Error(errorMsg));
          })
        );
    } else {
      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
            console.log('2 This is client side error FROM HttpInterceptor');
              errorMsg = `Error: ${error.error.message}`;
            } else {
            console.log('2 This is server side error');
              errorMsg = `2 Error Code FROM HttpInterceptor: ${error.status},  Message: ${error.message}`;
            }
          console.log(errorMsg);
            return  throwError(() => new Error(errorMsg));
          })
        );
    }
  }
  showErrorToastr(message: string) { // toastr для параллельного отображения сообщений в углу экрана
    this.toastr.error(message, '(Toastr ERROR from HttpInterceptor)', {
      timeOut: 4000,
      positionClass: 'toast-bottom-left',
    });
  }
}

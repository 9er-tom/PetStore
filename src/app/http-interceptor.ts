import {Observable, finalize} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {HttpEvent} from '@angular/common/http';
import {ApiService} from "./api.service";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private api: ApiService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.api.setLoading(true);

    return next.handle(req)
      .pipe(
        finalize(() => this.api.setLoading(false))
      );
  }
}

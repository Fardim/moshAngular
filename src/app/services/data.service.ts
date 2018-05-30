import { BadInput } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DataService{

  constructor(private url: string, private http : HttpClient) { }

  getAll(){
    return this.http.get(this.url)
      .pipe(
        map(response=> response),catchError(this.handleError));
  }

  create(resource){
    return this.http.post(this.url,JSON.stringify(resource))
      .pipe(
        map(response => response),catchError(this.handleError));
  }

  update(resource){
    return this.http.patch(this.url+'/'+resource.id, JSON.stringify({isRead : true}))
        .pipe(map(response => response),catchError(this.handleError));
  }

  delete(id){
    return this.http.delete(this.url+'/'+id,).pipe(catchError(this.handleError))
  }

  private handleError(error :Response){
    if(error.status === 404)
      return throwError(new NotFoundError());

    if(error.status === 400)
      return throwError(new BadInput(error)); // From angular 6 this response.json() dont work.

    return throwError(new AppError(error)); // From angular 6 this response.json() dont work.
  }
}
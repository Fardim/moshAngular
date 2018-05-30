import { BadInput } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  url : string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http : HttpClient) { }

  getPost(){
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  createPost(post){
    return this.http.post(this.url,JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }

  updatePost(post){
    return this.http.patch(this.url+'/'+post.id, JSON.stringify({isRead : true}))
    .pipe(catchError(this.handleError));
  }

  deletePost(id){
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

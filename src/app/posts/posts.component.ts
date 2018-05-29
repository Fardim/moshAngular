import { BadInput } from './../common/bad-input-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts : Post[];
  constructor(private service : PostService) {    // private keyword makes it a field in the class
    
  }

  ngOnInit() {
    this.service.getPost()
    .subscribe(
      (response:Post[])=>{
      //console.log(response); // From angular 6 this response.json() dont work.
        this.posts = response;
      },
      error=>{
        throw error;
        // alert('Something went wrong');
        // console.log(error);
      });
  }
  
  CreatePost(input : HTMLInputElement){
    let post :any = {title : input.value};
    this.service.createPost(post)
    .subscribe(
      (response:Post)=>{
        post.id = response.id;
        this.posts.splice(0,0,post);
        console.log(response);
      },
      (error : AppError)=>{
        if(error instanceof BadInput){
          //***this.form.setErrors(error.originalError);
        }
        else{
          throw error;
          // alert('Something went wrong');
          // console.log(error);
        }
      }
      // (error : Response)=>{
      //   if(error.status === 400){
      //     // this.form.setErrors(error.json());
      //   }
      //   else{
      //     alert('Something went wrong');
      //     console.log(error);
      //   }
      // }
    )
  }

  UpdatePost(post : any){
    this.service.updatePost(post)
    .subscribe(
      response =>{
        console.log(response);
      },
      error=>{
        throw error;
        // alert('Something went wrong');
        // console.log(error);
      })
  }

  DeletePost(post){
    this.service.deletePost(333)
    .subscribe(
      response=>{
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      },
      (error: AppError)=>{
        if(error instanceof NotFoundError)
          alert('Post with this id is already deleted');
        else{
          throw error;
          // alert('An unexpected error occured.');
          // console.log(error);  
        }
      }
      // (error: Response)=>{
      //   if(error.status === 404)
      //     alert('Post with this id is already deleted');
      //   else{
      //     alert('Something went wrong');
      //     console.log(error);  
      //   }
      // }
    )
  }

  

}

export interface Post {
  userId: number;
  id: number;
  title:string;
  body:string;
}

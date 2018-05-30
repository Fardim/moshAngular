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
    this.service.getAll()
    .subscribe(
      (posts : Post[])=>{
      //console.log(response); // From angular 6 this response.json() dont work.
        this.posts = posts;
      },
      error=>{
        throw error;
        // alert('Something went wrong');
        // console.log(error);
      });
  }
  
  CreatePost(input : HTMLInputElement){
    let post :any = {title : input.value};
    this.posts.splice(0,0,post);

    input.value = '';

    this.service.create(post)
    .subscribe(
      (newPost:Post)=>{
        post.id = newPost.id;
        //this.posts.splice(0,0,post); //optimistic way
        console.log(newPost);
      },
      (error : AppError)=>{
        this.posts.splice(0,1);
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
    this.service.update(post)
    .subscribe(
      updatedPost =>{
        console.log(updatedPost);
      },
      error=>{
        throw error;
        // alert('Something went wrong');
        // console.log(error);
      })
  }

  DeletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);

    this.service.delete(333)
    .subscribe(
      // response=>{
        ()=>{ // since delete dont return any body hence response in empty or function parameter is empty
        // let index = this.posts.indexOf(post);
        // this.posts.splice(index,1);
      },
      (error: AppError)=>{
        this.posts.splice(index,0,post);
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

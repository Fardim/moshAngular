import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  url : string = 'https://jsonplaceholder.typicode.com/posts';
  posts : Post[];
  constructor(private http : HttpClient) {    // private keyword makes it a field in the class
    http.get(this.url).subscribe((response:Post[])=>{
      //console.log(response); // From angular 6 this response.json() dont work.
      this.posts = response;
    })
  }
  
  CreatePost(input : HTMLInputElement){
    let post :any = {title : input.value};
    this.http.post(this.url,JSON.stringify(post)).subscribe((response:Post)=>{
      post.id = response.id;
      this.posts.splice(0,0,post);
      console.log(response);
    })
  }

  UpdatePost(post : any){
    this.http.patch(this.url+'/'+post.id, JSON.stringify({isRead : true})).subscribe(response =>{
      console.log(response);
    })

  }

  DeletePost(post){
    this.http.delete(this.url+'/'+post.id,).subscribe(response=>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    })
  }

  ngOnInit() {
  }

}

export interface Post {
  userId: number;
  id: number;
  title:string;
  body:string;
}

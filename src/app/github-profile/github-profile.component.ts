import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    console.log('GithubProfile onInit.');
    this.route.paramMap.subscribe(params =>{
      let id = +params.get('id');
      console.log(id);
    })
  }

  Submit(){
    // this.router.navigate(['/followers',1,2,3]);//required parameters at the []
    this.router.navigate(['/followers'],{         //query parameters
      queryParams:{page:1,order:'newest'}
    });
  }

}

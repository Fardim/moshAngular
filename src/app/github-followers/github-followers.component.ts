import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { StateKey } from '@angular/platform-browser';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(private route:ActivatedRoute, private service: GithubFollowersService) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(switchMap(combined =>{
      let id = combined[0].get('id');
      let page = combined[1].get('page');
      let order = combined[1].get('order');
      console.log({id,page,order});

      return this.service.getAll();
      // .subscribe(
      //   (followers: any[]) => {
      //     this.followers = followers
      //   }, 
      //   error => {
      //     throw error;
      //   }
      // );
    })).subscribe((followers : any) => {
      this.followers = followers;
    });

    //   .subscribe(combined=>{
    //     let id = combined[0].get('id');
    //     let page = combined[1].get('page');
    //     let order = combined[1].get('order');
    //     console.log({id,page,order});


    //     this.service.getAll()
    //     .subscribe(
    //       (followers: any[]) => {
    //         this.followers = followers
    //       }, 
    //       error => {
    //         throw error;
    //       }
    //     );
    // });

    // this.route.queryParamMap.subscribe(params=>{
    //   let page = params.get('page');
    //   let order = params.get('order');
    //   console.log({page,order});
    // });

    
  }
}

export interface Follower{
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
}

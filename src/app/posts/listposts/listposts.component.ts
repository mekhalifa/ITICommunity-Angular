import { Component, OnInit, Input } from '@angular/core';
//import { ApiPostService } from '../posts.service';
import { IPost, Post, IPostPost } from 'src/app/shared/models';
import { ApiPostService } from 'src/app/shared/services/api-post.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-listposts',
  templateUrl: './listposts.component.html',
  styleUrls: ['./listposts.component.scss']
})
export class ListpostsComponent implements OnInit {

 posts: IPostPost[]; 
 isLoadingResults = true;

  constructor(private _ApiPostService: ApiPostService, private router: Router, private alertify: AlertifyService) { 

  }

 
onChange(){


}

  userId: any;
  LikeN:any;
  ngOnInit() {

    this.userId = localStorage.getItem('userId')
    this._ApiPostService.getPosts()
      .subscribe((res: any) => {
        this.posts = res;
       // console.log(this.posts);
        
        this.isLoadingResults = false;
      }, err => {
       // console.log(err);
          this.alertify.error("Sorry Can't Loaded Posts 🤦‍♂️ ");
        this.isLoadingResults = false;
          
      });
  }


  deletePost(id){
    this.isLoadingResults = true;
    this._ApiPostService.deletePost(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.alertify.warning("Delete Post Success 👌");
        this.router.navigateByUrl('/listposts', { skipLocationChange: true }).then(() => {
          this.router.navigate(['home']);

        });
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
          this.alertify.error("Wrong when Delete Post 🤷‍♂️");
      }
      );
  }

  // ngOnInit() {

  //   this.postsService.getPosts().subscribe(m=>{

  //     console.log(m);
  //     this.posts=m;

  //   });
  //  // this.postsService.getpostsAll();
  // }

  getTimeOfPost(dateOfPost) {
    var timeNow = new Date();
    var postDate = new Date(dateOfPost)
    var timeDifference = (timeNow.getTime() - postDate.getTime()) / 1000;
    // console.log(timeDifference);
    // console.log(postDate);
    // console.log(timeNow);

    if (timeDifference >= 3600 * 24) {
      return `${Math.round(timeDifference / (3600 * 24))} day(s) ago`;
    } else if (timeDifference >= 3600) {
      return `${Math.round(timeDifference / 3600)} hr ago`;
    } else if (timeDifference >= 60) {
      return `${Math.round(timeDifference / 60)} min ago`;
    } else {
      return `${Math.round(timeDifference)} sec(s) ago`;
    }



  }


 onClickLike(Id) {
   
 } 

}

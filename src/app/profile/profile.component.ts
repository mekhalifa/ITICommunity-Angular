import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { error } from 'util';
import { ApiPostService } from '../shared/services/api-post.service';
import { timeInterval } from 'rxjs/operators';
import { JwtService } from '../shared/services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForProfile : any;
  postsOfUser : any;
  isLoadingResults:boolean; 
  userId: any;
  routSub:Subscription;


  constructor(private profileService: ProfileService, private ApiPostService: ApiPostService, private jwtService: JwtService,
    private _ApiPostService: ApiPostService, private router: Router, private routId: ActivatedRoute, private alertify: AlertifyService) { }
 
  ngOnInit() {

    this.routSub=this.routId.params.subscribe(m=> {
      console.log("prams",m)
    })
    this.userId=this.jwtService.getDecodedToken()['nameid'];
    this.loadUserForProfile(this.userId);
    this.loadPostsOfUser(this.userId);
    

  }

  loadUserForProfile(id) {
    this.profileService.getUserForProfile(id).subscribe((res: any) => {
      this.userForProfile = res;
      this.alertify.success("Welcome ❤")
     // console.log("000000"+res[0]);
     // console.log("alllll"+JSON.stringify( res));
    }, error => this.alertify.error("Can't Load Profile"));

  }

  loadPostsOfUser(id) {
    this.ApiPostService.getPostsOfUser(id).subscribe((res:any) => {
      this.postsOfUser = res;
      console.log(res);
    }, error => console.log(error))
  }



  deletePost(id) {
    this.isLoadingResults = true;
    this._ApiPostService.deletePost(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.alertify.warning("Delete Post Success 👌");
        this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
          this.router.navigate(['home']);
        });
      }, (err) => {
       // console.log(err);
          this.alertify.error("Wrong whene Delete Post 🤷‍♂️");
        this.isLoadingResults = false;
      }
      );
  }


  getTimeOfPost(dateOfPost){
    var timeNow = new Date();
    var postDate = new Date(dateOfPost)
    var timeDifference = (timeNow.getTime() - postDate.getTime())/1000;
    // console.log(timeDifference);
    // console.log(postDate);
    // console.log(timeNow);

    if (timeDifference >= 3600*24){
      return `${Math.round(timeDifference/(3600*24))} day(s) ago`;
    } else if (timeDifference >= 3600){
      return `${Math.round(timeDifference/3600)} hr ago`;
    } else if (timeDifference >= 60 ){
      return `${Math.round(timeDifference/60)} min ago`;
    } else {
      return `${Math.round(timeDifference)} sec(s) ago`;
    }


    
  }

}

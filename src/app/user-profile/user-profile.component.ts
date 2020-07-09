import { Component, OnInit, Input } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { error } from 'util';
import { ApiPostService } from '../shared/services/api-post.service';
import { timeInterval } from 'rxjs/operators';
import { JwtService } from '../shared/services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userForProfile : any;
  postsOfUser : any;
  isLoadingResults:boolean;
  isFollowed: boolean = false; 

   userId: any;
  routSub:Subscription;
   parmId:any;
   //otherUserId:any;
   exist= false;
check:boolean;
  constructor(private profileService: UserProfileService, private ApiPostService: ApiPostService, private jwtService: JwtService,
    private _ApiPostService: ApiPostService, private router: Router, private routId: ActivatedRoute, private service: UserProfileService, private alertify: AlertifyService) { }
 
  ngOnInit() {

    this.routSub=this.routId.queryParams.subscribe(m=> {
      this.parmId = m['id'];
      //console.log("prams", m['id'])
    })
    if(!this.parmId){
    this.userId=this.jwtService.getDecodedToken()['nameid'];
      this.check=false;
      this.router.navigate(['/profile']);
    }else{
      this.userId = this.parmId;
      this.check = true;
      //console.log("useeeer"+this.userId);

      localStorage.setItem('visitedId',this.userId);
    }

    this.loadUserForProfile(this.userId);
    this.loadPostsOfUser(this.userId);
    

  }

  loadUserForProfile(id) {
    this.profileService.getUserForProfile(id).subscribe((res: any) => {
      this.userForProfile = res;
      
     // console.log("000000"+res[0]);
     // console.log("alllll"+JSON.stringify( res));
    }, error => console.log(error));

  }

  loadPostsOfUser(id) {
    this.ApiPostService.getPostsOfUser(id).subscribe((res:any) => {
      this.postsOfUser = res;
      console.log(res);
    }, error => console.log(error))
  }





  getTimeOfPost(dateOfPost){
    var timeNow = new Date();
    var postDate = new Date(dateOfPost)
    var timeDifference = (timeNow.getTime() - postDate.getTime())/1000;
    console.log(timeDifference);
    console.log(postDate);
    console.log(timeNow);

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


  toggleFollow(){
    if (!this.isFollowed)
    {
      this.service.follow().subscribe(m => { console.log(m + 'success') }, (err) => console.log(err));
      this.isFollowed = true;
      this.alertify.success('Followed');

    } else {
      this.service.unfollow().subscribe(m => { console.log(m + 'success') }, (err) => console.log(err));
      this.isFollowed = false;
      this.alertify.warning('unFollowed');
    }

    // this.service.getById(this.userId).subscribe(res => {
    //  this.exist=true;

    // },err => this.exist=false )

  //  if (this.exist){

  //      return console.log('you already followed this user!')
  //  }
   
}

}

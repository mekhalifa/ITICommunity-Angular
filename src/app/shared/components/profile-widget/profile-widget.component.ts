import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { ApiUserService } from '../../services/api-user.service';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss']
})
export class ProfileWidgetComponent implements OnInit {

  user2:any;
  userId:any;
  constructor(private _ApiUserService: ApiUserService, private jwtService:JwtService) { }

  ngOnInit() {
    this.userId = this.jwtService.getDecodedToken()['nameid'];
    this._ApiUserService.getUser(this.userId)
      .subscribe((res: any) => {
        this.user2 =  res;
        console.log(this.user2);
        //this.isLoadingResults = false;
      }, err => {
        console.log(err);
        // this.isLoadingResults = false;
      });
  }

}

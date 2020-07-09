import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { JwtService } from '../shared/services/jwt.service';
import { AboutService } from './about.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  storyarea: any;
  workarea: any;
  educationarea: any;
  contactarea: any;
  storyid: number;
  //token = localStorage.getItem('token');
  userId = this.jwtService.getDecodedToken()['nameid']
  newStory: any;
  constructor(private http: HttpClient, private service: AboutService, private alertify: AlertifyService, private router: Router, private jwtService: JwtService) { }

  ngOnInit() {
    this.getStory();
    //  this.getWork();
    //  this.getEducation();
    // this.getContacts();
    //console.log(this.token);

    console.log(this.userId);
    console.log(this.jwtService.getDecodedToken());
  }

  getStory() {
    this.http.get('https://localhost:44363/api/Users/story/' + this.userId).subscribe(res => {
      this.storyarea = res;
      if (res.toString() != "") {
        this.alertify.success('Looking a Positive Story' + '&#128079');

      } else {
        this.alertify.success('No Story yet 🧐');
      }

      console.log(this.storyarea)
    }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
    )
  };


  deleteStory() {

    this.http.delete('https://localhost:44363/api/Users/deletestory/' + this.userId).subscribe(res => {
      //this.storyarea= res;
      this.alertify.success('Story Deleted 🙄');
      // this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['about']);
      // });
      this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
      });
      console.log(this.storyarea)
    }, error => { this.alertify.error('Oops!Something wrong happend.. try again 🤗'); }
    )
  };

  // AddStory(){
  //   var oldstory= document.getElementById('txt_story_already');
  //   var newstory=document.getElementById('txt_story').innerText;
  //   // nzherooooo
  //   // newstory.

  //    this.http.post<any>('https://localhost:44363/api/Users/addstory/'+this.userId,{ story: this.newStory }).subscribe( data => {
  //     console.log(newstory);
  //     //this.storyid = data.id;
  //   }, error=> console.log(error));



  // this.http.post('https://localhost:44363/api/Users/addstory/11').subscribe(res=>{
  //   this.workarea= res;
  //   if(res.toString()!=""){
  //     this.alertify.success('Keep forwarding'+'&#128079');

  //   }else{
  //     this.alertify.success('Nothing yet 🧐');

  //   }

  // },error=>{this.alertify.error('Oops! Something wrong happend.. try again 🤗');}
  // )};
  //}

  getWork() {
    this.http.get('https://localhost:44363/api/Users/work/' + this.userId).subscribe(res => {
      this.workarea = res;
      if (res.toString() == "No work yet") {
        this.alertify.success('Keep forwarding' + '&#128079');

      } else {
        this.alertify.success('Nothing yet 🧐');

      }

    }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
    )
  };

  getEducation() {
    this.http.get('https://localhost:44363/api/Users/education/' + this.userId).subscribe(res => {
      this.educationarea = res;
      if (res.toString() == "No Education Added") {
        this.alertify.success('Keep forwarding' + '&#128079');

      } else {
        this.alertify.success('Nothing yet 🧐');

      }
    }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
    )
  };

  getContacts() {
    this.http.get('https://localhost:44363/api/Users/contacts/' + this.userId).subscribe(res => {
      this.contactarea = res;
      if (res.toString() != "No Phone added" || res.toString() != "No email added" || res.toString() != "No address added") {
        this.alertify.success('Feel free to show or hide your contacts' + '🤷');

      } else {
        this.alertify.success('Nothing yet 🧐');

      }
      //console.log(this.contactarea);
    }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
    )
  };

  hidecontact() {

  }



}



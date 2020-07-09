import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css']
})
export class AboutEditComponent implements OnInit {

  storyarea:any;
  workarea:any;
  educationarea:any;
  contactarea:any;
  storyid:number;
  //token = localStorage.getItem('token');
  userId= this.jwtService.getDecodedToken()['nameid']
  newStory:any;
  constructor(private http: HttpClient,private alertify:AlertifyService,private router:Router,private jwtService:JwtService) { }

  ngOnInit() {
     this.getStory();
    //  this.getWork();
    //  this.getEducation();
    // this.getContacts();
    //console.log(this.token);

    console.log(this.userId);
    console.log(this.jwtService.getDecodedToken());
  }
  postForm = new FormGroup({
    
    story: new FormControl()
    // ,
    // userId: new FormControl(this.userId)

  });
 

  getStory(){
    this.http.get('https://localhost:44363/api/Users/story/'+this.userId).subscribe(res=>{
    this.storyarea= res;
    if(res.toString()!=""){
      this.alertify.success('Looking a Positive Story'+'&#128079');
  
    }else{
      this.alertify.success('No Story yet 🧐');
   }
  
    console.log(this.storyarea)
  },error=>{this.alertify.error('Oops! Something wrong happend.. try again 🤗');}
  )};
  // getWork() {
  //   this.http.get('https://localhost:44363/api/Users/work/' + this.userId).subscribe(res => {
  //     this.workarea = res;
  //     if (res.toString() == "No work yet") {
  //       this.alertify.success('Keep forwarding' + '&#128079');

  //     } else {
  //       this.alertify.success('Nothing yet 🧐');

  //     }

  //   }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
  //   )
  // };

  // getEducation() {
  //   this.http.get('https://localhost:44363/api/Users/education/' + this.userId).subscribe(res => {
  //     this.educationarea = res;
  //     if (res.toString() == "No Education Added") {
  //       this.alertify.success('Keep forwarding' + '&#128079');

  //     } else {
  //       this.alertify.success('Nothing yet 🧐');

  //     }
  //   }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
  //   )
  // };

  // getContacts() {
  //   this.http.get('https://localhost:44363/api/Users/contacts/' + this.userId).subscribe(res => {
  //     this.contactarea = res;
  //     if (res.toString() != "No Phone added" || res.toString() != "No email added" || res.toString() != "No address added") {
  //       this.alertify.success('Feel free to show or hide your contacts' + '🤷');

  //     } else {
  //       this.alertify.success('Nothing yet 🧐');

  //     }
  //     //console.log(this.contactarea);
  //   }, error => { this.alertify.error('Oops! Something wrong happend.. try again 🤗'); }
  //   )
  // };


  PostStory(){
  
  // console.log("44"+this.postForm.get('story').value);
  // this.postForm = new FormGroup({
 
  //   story: new FormControl(this.postForm.get('story').value)
  //   //,
  //   //userId: new FormControl(this.userId)

  // });
   this.http.post('https://localhost:44363/api/Users/addstory/'+this.userId+'/'+this.postForm.get('story').value  , {
     responseType: 'text'  })
       .subscribe(res => {
         console.log(res);
      })
  console.log("5",this.postForm.value);
    this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
    this.router.navigate(['']);
 });
 }
 


}



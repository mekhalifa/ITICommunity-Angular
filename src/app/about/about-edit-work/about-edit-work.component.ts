import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-about-edit-work',
  templateUrl: './about-edit-work.component.html',
  styleUrls: ['./about-edit-work.component.css']
})
export class AboutEditWorkComponent implements OnInit {
  workarea:any;
  userId= this.jwtService.getDecodedToken()['nameid']
  constructor(private http: HttpClient,private alertify:AlertifyService,private router:Router,private jwtService:JwtService) { }

  ngOnInit() {
    this.workForm = new FormGroup({
      title:new FormControl(),
    companyName:new FormControl(),
    description:new FormControl(),
    userId:new FormControl(this.userId)
  })
  console.log(this.workForm);
  }
  

  workForm=new FormGroup({
    title:new FormControl(),
    companyName:new FormControl(),
    description:new FormControl(),
    userId:new FormControl(this.userId)
  });

 
  postWork(){
    this.http.post('https://localhost:44363/api/UserWorkExperiences',this.workForm.value , {
       responseType: 'text'  })
         .subscribe(res =>{
          this.alertify.success('Work added successfully👌')
         }, error => { this.alertify.error('Oops!Something wrong happend.. try again 🤗')});
         console.log('1'+this.workForm);
         console.log('2'+this.workForm.value);
    this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
       
    //console.log("5",this.postForm.value);
  }
}

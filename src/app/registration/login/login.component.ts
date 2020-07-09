import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
// import { JwtService } from '../../shared/services/jwt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  decodedToken:any;
  token:any;

  loginForm:FormGroup;
  isSubmitted =false;

  isError=false;
  errorMsg:string;

  constructor(private service: RegistrationService, private tokenService: JwtService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {

    this.createForm();
  }


  createForm(){
    this.loginForm = new FormGroup({

      emailaddress : new FormControl('',Validators.required),

      password : new FormControl('',Validators.required)

    });
  }


  onSubmit() {

    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.isSubmitted) {

      //console.log(this.loginForm.value);

      this.service.login(this.loginForm.value).

        subscribe(res => { 
          
          this.token = res['token'];

          localStorage.setItem('token',this.token);
          localStorage.setItem('profilePicUser', res['user']['profilePic'] );
          localStorage.setItem('userId', res['user']['id'] );
         // console.log(res);
         // console.log(this.tokenService.getDecodedToken());
       this.alertify.success("Login Success 🎉🎉")
          this.router.navigate(['/']);

        }, err =>  { 
          this.isError=true;
          this.errorMsg=err;
          this.alertify.error ("Email or passeord Wrong 🤦‍♂️") });

    }

  }


  
}



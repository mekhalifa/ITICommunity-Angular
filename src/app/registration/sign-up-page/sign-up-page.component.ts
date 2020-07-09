import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  isError=false;
  errorMsg:string;
  isSubmitted = false;

  signUpForm : FormGroup;
  
  Intakes:number []=[];

  Tracks:string []=[];

  Branchs:string []=[];

  constructor(private service: RegistrationService, private alertify: AlertifyService) { }

  ngOnInit() {

    this.createForm();

    this.GetIntakes();

    this.GetTracks();

    this.GetBranchs();
  }

  createForm(){

    this.signUpForm = new FormGroup({

      name: new FormControl('', [ Validators.required ]),

      emailAddress: new FormControl('', [ Validators.required ]),

      userName: new FormControl('', [ Validators.required ]),

      password: new FormControl('' ,[ Validators.required,Validators.minLength (8) ]),

      // confirmPassword: new FormControl('',[ Validators.required 
      // ]),
      nationalId: new FormControl('',[ Validators.required ,Validators.minLength (14)]),
      intakeId: new FormControl('',Validators.required ),
      branchId: new FormControl('',Validators.required ),
      trackId: new FormControl('',Validators.required ),
      //age : new FormControl('')
  
    } );

  }

  GetBranchs(){
    this.service.getBranchs().subscribe(
      branchs =>  {
      for(let i = 0; i< branchs.length; i++)
      {
        // this.Branchs.push(branchs[i].branchId )
        // this.idNamePair[0]['id'] =branchs[i].branchId 

        // this.Branchs.push(branchs[i].branchLocation )
        this.Branchs.push(branchs);
      }
    }
    );
  return this.Branchs;

  }

  GetIntakes(){
    this.service.getIntakes().subscribe(
      intakes =>  {
      for(let i = 0; i< intakes.length; i++)
      {
        //this.Intakes.push(intakes[i].intake1 ) WRONG HAS NO VALUE IN SELECT 
        //INSTEAD WE WILLPUSH THE ENTIRE OBJECT RESULT// AND ACCESS USING INDEX
        this.Intakes.push(intakes)
      }
    }
    );
      return this.Intakes;
   }
  
  
   GetTracks(){
    this.service.getTracks().subscribe(
       tracks => {
  
         for (let i = 0 ; i< tracks.length; i++)
         {
          //this.Tracks.push(tracks[i].track1 )
          this.Tracks.push(tracks)
         }
  
         //console.log(tracks)
         //console.log(this.Tracks);
  
      }
    )
    return this.Tracks;
  
   }


   onSubmit() {
     
    this.isSubmitted = true;

    if(this.signUpForm.invalid){
      return;
    }

    if(this.isSubmitted){
      this.service.register(this.signUpForm.value)
      .subscribe (
        () => {
  
          //console.log(JSON.stringify(response));
        //  console.log('Registeration success')
          this.signUpForm.reset();
          this.alertify.success("Registration Success");
  
        }, error => {
          this.isError = true;
         // this.errorMsg = error;
          console.log(error)
          this.alertify.warning(error);
        }
  
      );   
  
      //ng console.log(JSON.stringify(this.signUpForm.value));
  
    }
    }
     
}

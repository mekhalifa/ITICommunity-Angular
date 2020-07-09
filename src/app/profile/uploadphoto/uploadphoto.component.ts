import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPostService } from 'src/app/shared/services/api-post.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ApiUserService } from 'src/app/shared/services/api-user.service';
@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrls: ['./uploadphoto.component.scss']
})
export class UploadphotoComponent implements OnInit {



  constructor(private http: HttpClient, private _ApiUserService: ApiUserService, private router: Router, private jwtService: JwtService) { }

  userId: any;
  user: any;
  pic = localStorage.getItem('profilePicUser');


  ngOnInit() {
    this.userId = this.jwtService.getDecodedToken()['nameid'];
  }

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }



  getFilePathFn(path: any) {
    console.log(path.target.value);
    this.uploadedFilePath = path.target.value;
  }

  photoForm = new FormGroup({


    userId: new FormControl(this.userId),

    file: new FormControl(this.uploadedFilePath)

  });









  onSubmit1() {
    console.log("hellloooo");
    let uploadedFilePath2;
    const photoForm = new FormData();
    photoForm.append('file', this.fileData);
    this.http.post('https://localhost:44363/api/ImageUpload', photoForm, {
      responseType: 'text'
    })
      .subscribe(res => {
        console.log(res);
        // this.uploadedFilePath = res as string;
        if (res.toString() === "Object reference not set to an instance of an object.") {
          uploadedFilePath2 = null

        } else {
          uploadedFilePath2 = res as string;
        }

        // console.log(this.uploadedFilePath); 
        console.log("1" + uploadedFilePath2);


        this.photoForm = new FormGroup({


          userId: new FormControl(this.userId),

          ProfilePic: new FormControl(uploadedFilePath2)

        });
        this.photoForm['ProfilePic'].Value = res as string;
        
        this._ApiUserService.updateUser(this.userId,this.photoForm.value).subscribe(res => {

          this.user = res;
          
            this.router.navigate(['profile']);
          

        }, (err: any) => {
          console.log(err);
          //this.isLoadingResults = false;
        });


      })


  }



}

import { Component, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { IPostPost, Post } from 'src/app/shared/models';
import { map } from 'rxjs/operators';
import { ApiPostService } from 'src/app/shared/services/api-post.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AlertifyService } from 'src/app/_services/alertify.service';







@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  
 


  constructor(private http: HttpClient, private _ApiPostService: ApiPostService, private router: Router, private jwtService: JwtService, private alertify: AlertifyService) { }

  userId: any;
  pic= localStorage.getItem('profilePicUser');


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

  // onSubmit() {
  //   const postForm = new FormData();
  //   postForm.append('file', this.fileData);
  //   console.log(postForm);
  //   this.http.post('https://localhost:44363/api/ImageUpload', postForm, { responseType: 'text' }).subscribe(res =>{
  //       console.log(res);
  //      this.uploadedFilePath = res as string;
  //      // console.log(this.uploadedFilePath );
  //      // alert('SUCCESS !!');
  //     });
  //   console.log(this.uploadedFilePath);
  // }

  // getFilePathFn(path:any){
  //   console.log(path.target.value);
  //   this.uploadedFilePath = path.target.value ;
  // }
 

 today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  dateTime = this.date + ' ' + this.time;

  postForm = new FormGroup({
    
    postBody: new FormControl(),
    userId: new FormControl(this.userId),
    date: new FormControl(this.dateTime),
    picture: new FormControl(this.uploadedFilePath)

  });
 
  post: Post ;


  // postPost() {
  //   return this.http.post<IPostPost>("https://localhost:44363/api/posts",this.post,{ responseType: 'json' }).pipe(
  //   map(() => {

  //     const res: IPostPost =new IPostPost();
      
  //         res.postBody = this.postForm.get('postBody').value;
  //         res.picture = this.uploadedFilePath.toString();
  //         res.date=new Date();
  //         res.userId= 1;

          
  //     return res;

       
  //   })); 
  // }
  
onSubmit(){
 let uploadedFilePath2;
  const postForm = new FormData();
  postForm.append('file', this.fileData);
  this.http.post('https://localhost:44363/api/ImageUpload', postForm, {
    responseType: 'text'  })
      .subscribe(res => {
      //  console.log(res);
       // this.uploadedFilePath = res as string;
        if (res.toString() ==="Object reference not set to an instance of an object.")
        {
          uploadedFilePath2=null

        }else{
          uploadedFilePath2 = res as string;
        }
        
       // console.log(this.uploadedFilePath); 
      //  console.log("1"+uploadedFilePath2); 
        

        this.postForm = new FormGroup({

          postBody: new FormControl(this.postForm.get('postBody').value),
          userId: new FormControl(this.userId),
          date: new FormControl(this.dateTime),
          picture: new FormControl(uploadedFilePath2)

        });
       // this.postForm['picture'].Value = res as string;
        this._ApiPostService.addPost(this.postForm.value).subscribe(res => {

          this.post = res;
          this.router.navigateByUrl('/listposts', { skipLocationChange: true }).then(() => {
            this.router.navigate(['home']);
            this.alertify.success("Creata Post Success 👏");
          });

        }, (err: any) => {
            this.alertify.error("Create Post failed 🤷‍♂️");
          //this.isLoadingResults = false;
        });


      })

  // this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
  //   this.router.navigate(['home']);
 // });
 
}


p= function setpost(path) {

  this.postForm = new FormGroup({

    postBody: new FormControl(),
    userId: new FormControl(this.userId),
    date: new FormControl(this.dateTime),
    picture: new FormControl(path)

  });
  
  
}




}

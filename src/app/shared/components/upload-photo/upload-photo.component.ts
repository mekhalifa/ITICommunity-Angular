import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})

export class UploadPhotoComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

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
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.http.post('url/to/your/api', formData, { responseType: 'text' })
  //     .subscribe(res => {
  //       console.log(res);
  //       this.uploadedFilePath = res as string;
  //       alert('SUCCESS !!');
  //     })
  // }
  //https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload
   formData = new FormData();
  onUpload() {
    const formData = new FormData();
    formData.append('file', this.fileData);

    this.fileUploadProgress = '0%';

    this.http.post('https://localhost:44363/api/ImageUpload', formData, {
      responseType: 'text',
      // reportProgress: true,
       observe: 'events'
    }).subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
        //  this.uploadedFilePath = events;
          this.uploadedFilePath=events.body;
          console.log(events.body);
         // alert('SUCCESS !!');
          this.getUploadedFilePathClick.emit(this.uploadedFilePath);
        }
        
      })

  }


  @Output() public getUploadedFilePathClick = new EventEmitter<string>();


}
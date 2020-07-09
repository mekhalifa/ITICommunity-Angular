import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ProfileWidgetComponent, UploadPhotoComponent, SearchComponent, HeaderComponent, PageNotFoundComponent } from '.';





@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, SearchComponent, ProfileWidgetComponent, UploadPhotoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent,PageNotFoundComponent,SearchComponent,ProfileWidgetComponent,UploadPhotoComponent]
})
export class SharedModule { }

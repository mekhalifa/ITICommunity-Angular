import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { PostsModule } from '../posts/posts.module';
import { UploadphotoComponent } from './uploadphoto/uploadphoto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent, UploadphotoComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    SharedModule,
    HomeModule,
    PostsModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[]
})
export class ProfileModule { }

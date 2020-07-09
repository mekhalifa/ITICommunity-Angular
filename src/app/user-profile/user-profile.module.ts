import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { PostsModule } from '../posts/posts.module';



@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    RouterModule,
    SharedModule,
    HomeModule,
    PostsModule
  ],exports:[]
})
export class UserProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListpostsComponent } from './listposts/listposts.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostsComponent, PostComponent, CreatePostComponent, ListpostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
    
  ],exports:[PostsComponent,CreatePostComponent,ListpostsComponent]
})
export class PostsModule { }

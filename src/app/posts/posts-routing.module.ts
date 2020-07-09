import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { PageNotFoundComponent } from '../shared';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'posts'},
  { path: 'posts',  component: PostsComponent },
  {path:'post',component:PostComponent},
  { path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }

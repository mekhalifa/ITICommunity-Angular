import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';

import { PostComponent } from './posts/post/post.component';
import { PageNotFoundComponent } from './shared';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { AboutRoutingModule } from './about/about-routing.module';
import { AboutComponent } from './about/about.component';
import { AboutModule } from './about/about.module';




const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import("./home/home.module").then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren:()=>import("./profile/profile.module").then(m=>m.ProfileModule),  canActivate: [AuthGuard]},
  { path: 'profilee', loadChildren: () => import("./user-profile/user-profile.module").then(m => m.UserProfileModule), canActivate: [AuthGuard] },
  { path: 'about', loadChildren: () => import("./about/about.module").then(m => m.AboutModule), canActivate: [AuthGuard] },
  { path: 'people', loadChildren: () => import("./people/people.module").then(m => m.PeopleModule), canActivate: [AuthGuard] },
  {path:  'registration',loadChildren:()=>import("./registration/registration.module").then(m=>m.RegistrationModule)},
  { path: 'posts', loadChildren: () => import("./posts/posts.module").then(m => m.PostsModule), canActivate: [AuthGuard] },

  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]  }

];

@NgModule({
  declarations:[],

  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{enableTracing:false}),
    AboutModule
  ],
    

  exports: [RouterModule]
})
export class AppRoutingModule { }

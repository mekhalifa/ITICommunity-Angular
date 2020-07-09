import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AboutEditWorkComponent } from './about-edit-work/about-edit-work.component';
import { AboutEditComponent } from './about-edit/about-edit.component';


const routes: Routes = [
  
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  {path:'about/edit',component:AboutEditComponent},
{path:'about/edit/work',component:AboutEditWorkComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people.component';


const routes: Routes = [
  
   { path: '', pathMatch: 'full', component: PeopleComponent }

];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [
      
   ]
})
export class PeopleRoutingModule { }

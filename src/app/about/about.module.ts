import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AboutEditComponent } from './about-edit/about-edit.component';
import { AboutEditWorkComponent } from './about-edit-work/about-edit-work.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AboutComponent,AboutEditComponent,AboutEditWorkComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AboutComponent]
})
export class AboutModule { }

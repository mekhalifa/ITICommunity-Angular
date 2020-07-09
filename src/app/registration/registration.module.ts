import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';


@NgModule({
  declarations: [RegistrationComponent, LoginComponent, SignUpPageComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class RegistrationModule { }

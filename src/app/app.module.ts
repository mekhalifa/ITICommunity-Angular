import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import{HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ErrorInterceptorProvider } from './shared/services/error.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProfileModule,
    UserProfileModule,
    
    
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ErrorInterceptorProvider ],
  bootstrap: [AppComponent]
})
export class AppModule { }

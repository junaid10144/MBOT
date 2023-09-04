import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    RegisterComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // remove
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ]
})
export class AuthModule { }

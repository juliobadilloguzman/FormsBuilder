import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupViewComponent } from './signup-view/signup-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [SignupViewComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService]
})
export class SignupModule { }

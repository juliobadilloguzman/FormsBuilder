import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupViewComponent } from './signup-view/signup-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [SignupViewComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SignupModule { }

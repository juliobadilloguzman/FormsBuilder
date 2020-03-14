import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FillRoutingModule } from './fill-routing.module';
import { FillViewComponent } from './fill-view/fill-view.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FillViewComponent],
  imports: [
    CommonModule,
    FillRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FillModule { }

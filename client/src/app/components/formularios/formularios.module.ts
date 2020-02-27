import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { FormulariosViewComponent } from './formularios-view/formularios-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [FormulariosViewComponent],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class FormulariosModule { }

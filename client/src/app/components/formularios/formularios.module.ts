import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { FormulariosViewComponent } from './formularios-view/formularios-view.component';


@NgModule({
  declarations: [FormulariosViewComponent],
  imports: [
    CommonModule,
    FormulariosRoutingModule
  ]
})
export class FormulariosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderViewComponent } from './builder-view/builder-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [BuilderViewComponent],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class BuilderModule { }

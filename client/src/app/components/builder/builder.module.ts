import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderViewComponent } from './builder-view/builder-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuilderEditViewComponent } from './builder-edit-view/builder-edit-view.component';


@NgModule({
  declarations: [BuilderViewComponent, BuilderEditViewComponent],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BuilderModule { }

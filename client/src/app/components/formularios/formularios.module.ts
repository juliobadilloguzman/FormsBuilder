import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { FormulariosViewComponent } from './formularios-view/formularios-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ListUsersViewComponent } from './list-users-view/list-users-view.component';
import { RespuestasLlenadoViewComponent } from './respuestas-llenado-view/respuestas-llenado-view.component';

import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { GraficaPastelComponent } from './grafica-pastel/grafica-pastel.component';
import { GraficaBarrasComponent } from './grafica-barras/grafica-barras.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';

@NgModule({
  declarations: [
    FormulariosViewComponent,
    ListUsersViewComponent,
    RespuestasLlenadoViewComponent,
    GraficaPastelComponent,
    GraficaBarrasComponent,
    GraficaDonaComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule,
    WavesModule
  ]
})
export class FormulariosModule { }

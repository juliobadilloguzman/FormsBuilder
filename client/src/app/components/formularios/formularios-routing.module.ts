import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulariosViewComponent } from './formularios-view/formularios-view.component';
import { ListUsersViewComponent } from './list-users-view/list-users-view.component';
import { RespuestasLlenadoViewComponent } from './respuestas-llenado-view/respuestas-llenado-view.component';


const routes: Routes = [
  {path: '', component: FormulariosViewComponent},
  {path: ':idFormulario/users', component: ListUsersViewComponent},
  {path: ':idFormulario/respuestas/:idUsuario', component: RespuestasLlenadoViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }
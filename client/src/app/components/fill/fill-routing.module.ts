import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FillViewComponent } from './fill-view/fill-view.component';


const routes: Routes = [
  {path: ':idCuestionario', component: FillViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillRoutingModule { }

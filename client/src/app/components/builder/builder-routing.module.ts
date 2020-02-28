import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderViewComponent } from './builder-view/builder-view.component';


const routes: Routes = [
  {path: '', component: BuilderViewComponent},
  {path: ':idCuestionario?', component: BuilderViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }

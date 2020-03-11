import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderViewComponent } from './builder-view/builder-view.component';
import { BuilderEditViewComponent } from './builder-edit-view/builder-edit-view.component';


const routes: Routes = [
  {path: '', component: BuilderViewComponent},
  {path: ':idCuestionario', component: BuilderEditViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupViewComponent } from './signup-view/signup-view.component';


const routes: Routes = [
  {path: '', component: SignupViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }

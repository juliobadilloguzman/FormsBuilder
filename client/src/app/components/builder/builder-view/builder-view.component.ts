import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-builder-view',
  templateUrl: './builder-view.component.html',
  styleUrls: ['./builder-view.component.scss']
})
export class BuilderViewComponent implements OnInit {

  nombreUsuario: string;

  constructor(private _formsService: FormsService, private _authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;
  }

  logOut(){
    this._authService.logOut();
  }

}

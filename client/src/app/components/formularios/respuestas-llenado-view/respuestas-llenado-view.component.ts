import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-respuestas-llenado-view',
  templateUrl: './respuestas-llenado-view.component.html',
  styleUrls: ['./respuestas-llenado-view.component.scss']
})
export class RespuestasLlenadoViewComponent implements OnInit {

  nombreUsuario: string;
  idUsuario: number;
  idCuestionario: number;

  nombreFormulario: string;
  descripcionFormulario: string;

  constructor(private _authService: AuthService, private _formsService: FormsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene el id del cuestionario
    this.idCuestionario = parseInt(this.activatedRoute.snapshot.paramMap.get('idFormulario'));
    console.log(this.idCuestionario);
  }

  logOut(){
    this._authService.logOut();
  }

}

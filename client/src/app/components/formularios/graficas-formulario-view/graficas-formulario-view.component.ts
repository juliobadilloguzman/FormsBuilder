import { Component, OnInit } from '@angular/core';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioGrafica } from 'src/app/models/cuestionarioGrafica';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreguntaMultiple } from 'src/app/models/preguntaMultiple';

@Component({
  selector: 'app-graficas-formulario-view',
  templateUrl: './graficas-formulario-view.component.html',
  styleUrls: ['./graficas-formulario-view.component.scss']
})
export class GraficasFormularioViewComponent implements OnInit {

  nombreUsuario: string;
  idUsuario: number;
  idCuestionario: number;
  cuestionario: CuestionarioGrafica;

  nombreFormulario: string;
  descripcionFormulario: string;
  preguntas: PreguntaMultiple[];

  hasResponse = false;
  hasResponseUsers: boolean;
  hasUsers: boolean;

  constructor(private _authService: AuthService, private _formsService: FormsService,
    private activatedRoute: ActivatedRoute) {
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));
  }

  ngOnInit(): void {

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    this.idCuestionario = parseInt(this.activatedRoute.snapshot.paramMap.get('idFormulario'));
    console.log(this.idCuestionario);

    this.idUsuario = parseInt(this.activatedRoute.snapshot.paramMap.get('idUsuario'));
    console.log(this.idUsuario);

    //Obtiene los usuarios que han respondido el formulario
    this._formsService.getUsersByFormId(this.idCuestionario).subscribe(
      res => {
        this.hasResponseUsers = true;
        if (res['message'] == 'noUsers') {
          this.hasUsers = true;
        } else {
          this.hasUsers = false;
        }
      },
      error => console.log(error)
    )

    //Obtener los datos de las gráficas del formulario
    this._formsService.getFormGraphData(this.idCuestionario).subscribe(
      res => {
        this.hasResponse = true;
        this.cuestionario = res;
        this.nombreFormulario = this.cuestionario.Nombre;
        this.descripcionFormulario = this.cuestionario.Descripcion;
        this.preguntas = this.cuestionario.preguntas;

        console.log(this.descripcionFormulario);
      },
      error => console.log(error)
    );
  }

  logOut() {
    this._authService.logOut();
  }
}

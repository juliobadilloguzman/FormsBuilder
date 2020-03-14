import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-fill-view',
  templateUrl: './fill-view.component.html',
  styleUrls: ['./fill-view.component.scss']
})
export class FillViewComponent implements OnInit {

  idCuestionario: string|number;
  nombreUsuario: string;

  constructor(private _authService: AuthService, private _formsService: FormsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  
    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene el id del cuestionario
    this.idCuestionario = parseInt(this.activatedRoute.snapshot.paramMap.get('idFormulario'));
    console.log(this.idCuestionario);

    this._formsService.getFormById(this.idCuestionario).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  logOut(){
    this._authService.logOut();
  }

}

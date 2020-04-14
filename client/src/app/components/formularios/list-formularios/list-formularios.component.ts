import { Component, OnInit } from '@angular/core';
import { CuestionarioGeneralInfo } from 'src/app/models/cuestionarioGeneralInfo';
import { FormsService } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-formularios',
  templateUrl: './list-formularios.component.html',
  styleUrls: ['./list-formularios.component.scss']
})
export class ListFormulariosComponent implements OnInit {

  idUsuario: number;
  nombreUsuario: string;
  cuestionarios: CuestionarioGeneralInfo[] = [];
  hasResponse: boolean;;

  constructor(private _formsService: FormsService, private _authService: AuthService,
    private router: Router) { 
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));
  }

  ngOnInit(): void {

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene los formularios
    this._formsService.getAllFormsByDate().subscribe(res =>{
      this.hasResponse=true;
      this.cuestionarios = res;
      console.warn(this.cuestionarios);
    },
    error => {
      console.error(error);
    });

  }

  logOut(){
    this._authService.logOut();
  }

  fillQ(idCuestionario: string | number){
    this.router.navigate([`/fill/${idCuestionario}`]);
  }

}

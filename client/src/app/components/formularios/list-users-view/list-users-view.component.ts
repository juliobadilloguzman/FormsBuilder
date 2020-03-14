import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { UsuarioLlenado } from 'src/app/models/usuariollenado';

@Component({
  selector: 'app-list-users-view',
  templateUrl: './list-users-view.component.html',
  styleUrls: ['./list-users-view.component.scss']
})
export class ListUsersViewComponent implements OnInit {

  nombreUsuario: string;
  idUsuario: number;
  idCuestionario: number;
  cuestionario: Cuestionario;
  nombreFormulario: string;
  descripcionFormulario: string;
  usuarios: UsuarioLlenado[];

  hasResponseForm: boolean = false;
  hasResponseUsers: boolean = false;
  hasUsers: boolean = true;

  constructor(private _authService: AuthService, private _formsService: FormsService,
    private activatedRoute: ActivatedRoute) { 
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));

  }

  ngOnInit(): void {

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene el id del cuestionario
    this.idCuestionario = parseInt(this.activatedRoute.snapshot.paramMap.get('idFormulario'));
    console.log(this.idCuestionario);

    //Obtiene los usuarios que han respondido el formulario
    this._formsService.getUsersAnswersByFormId(this.idCuestionario).subscribe(
      res => {

        console.log(res);
        this.hasResponseUsers = true;
        
        if(res['message'] == 'noUsers'){
         this.hasUsers=true;
        }else{
          this.hasUsers=false;
          this.usuarios = res;
        }

       
      
      },
      error => console.log(error)
    )

    //Obtiene el Cuestionario
    this._formsService.getFormById(this.idCuestionario).subscribe(
      res => {
        this.hasResponseForm=true;
        this.cuestionario = res;
        this.nombreFormulario = this.cuestionario.Nombre;
        this.descripcionFormulario = this.cuestionario.Descripcion;
      },
      err => console.error(err)
    )

  }

  logOut(){
    this._authService.logOut();
  }

}

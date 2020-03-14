import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularios-view',
  templateUrl: './formularios-view.component.html',
  styleUrls: ['./formularios-view.component.scss']
})
export class FormulariosViewComponent implements OnInit {

  idUsuario: number;
  nombreUsuario: string;
  cuestionarios: Cuestionario[] = [];
  hasResponse: boolean;;

  constructor(private _formsService: FormsService, private _authService: AuthService,
    private router: Router) { 
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));
  }

  ngOnInit(): void {
    this.hasResponse=false;
    //Obtiene los formularios de acuerdo al id del usuario creador
    this._formsService.getFormsByUserId(this.idUsuario).subscribe(res =>{
      this.hasResponse=true;
      this.cuestionarios = res;
      console.warn(this.cuestionarios);
    },
    error => {
      console.error(error);
    });

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

  }

  goToBuilder(){
    this.router.navigate(['/builder']);
  }

  logOut(){
    this._authService.logOut();
  }

  editForm(idCuestionario: string | number){
    this.router.navigate([`/builder/${idCuestionario}`]);
  }

  copyToClipBoard(idFormulario){

    let ruta = "http://localhost:4200/builder/"+idFormulario;

    let input = document.createElement('input');
    input.value = ruta;

    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    input.focus();
    input.setSelectionRange(0, 0);

  }

  deleteForm(idFormulario: number | string){
    alert(`a eliminar ${idFormulario}`);
  }

  goToFilledByUsers(idCuestionario: number | string){
    this.router.navigate([`/form/${idCuestionario}/users'`]);
  }

  

}

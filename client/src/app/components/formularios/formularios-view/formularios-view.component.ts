import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

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
    private router: Router, private _snackBar: MatSnackBar) { 
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

    let ruta = "http://localhost:4200/fill/"+idFormulario;

    let input = document.createElement('input');
    input.value = ruta;
    

    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    input.focus();
    input.setSelectionRange(0, 0);

    input.setAttribute('type', 'hidden');

    this._snackBar.open(`Vínculo copiado a portapapeles`, "", {
      duration: 2000,
      panelClass: "snackbar-success-green",
      verticalPosition: "bottom",
      horizontalPosition: "right"
    });

  }

  deleteForm(idFormulario: number | string){
    console.log(`a eliminar ${idFormulario}`);
    Swal.fire({
      title: '¿Está seguro de eliminar el cuestionario?',
      text: "No podrá recuperarlo despues de haberla borrado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._formsService.deleteForm(idFormulario).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El cuestionario ha sido eliminado correctamente.',
              'success'
            )
            this.ngOnInit();
          },
          err => alert(err)
        )
        
      }
    })
  }

  goToFilledByUsers(idCuestionario: number | string){
    this.router.navigate([`/formularios/${idCuestionario}/users`]);
  }

  goToCharts(idCuestionario:number|string){
    this.router.navigate([`/formularios/${idCuestionario}/graphs`]);
  }
  

}

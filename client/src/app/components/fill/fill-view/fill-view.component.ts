import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Cuestionario } from 'src/app/models/cuestionario';
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { elementAt } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-fill-view',
  templateUrl: './fill-view.component.html',
  styleUrls: ['./fill-view.component.scss']
})
export class FillViewComponent implements OnInit {

  idCuestionario: string|number;
  nombreUsuario: string;
  cuestionario: Cuestionario;
  nombreFormulario: string;
  descripcionFormulario: string;
  hasForm: boolean=false;

  questionarie: any;

  constructor(private _authService: AuthService, private _formsService: FormsService,
    private activatedRoute: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene el id del cuestionario
    this.idCuestionario = parseInt(this.activatedRoute.snapshot.paramMap.get('idFormulario'));
    console.log(this.idCuestionario);

    //Obtiene el Cuestionario
    this._formsService.getFormById(this.idCuestionario).subscribe(
      res => {

        
        this.cuestionario = res;
        this.questionarie = res;
        this.nombreFormulario = this.cuestionario.Nombre;
        this.descripcionFormulario = this.cuestionario.Descripcion;

        this.hasForm=true;

        //Agregamos el atributo de respuesta a las preguntas abiertas
        for (let iterator of this.questionarie.preguntasAbiertas) {
          iterator.respuesta = '';
        }

        let i = 0;
        let idPregunta = 'pregunta'+i;

        for (let element of this.questionarie.preguntasMultiples) {
          element.id = idPregunta+i;
          i++;
        }
        

        console.warn(this.questionarie);
      
      },
      err => console.error(err)
    )
  }


  logOut(){
    this._authService.logOut();
  }

  fill(){

    //Agrega campos de idUsuario y cuestionario
    this.questionarie.idUsuario = parseInt(localStorage.getItem('idUsuario'));
    this.questionarie.idCuestionario = this.idCuestionario;
    
    //Elimina campos de nombre y desccripcion
    delete this.questionarie['Nombre'];
    delete this.questionarie['Descripcion'];

    //Elimina las opciones
    for(let itearator of this.questionarie.preguntasMultiples){
      delete itearator.opciones;
    }

    console.log(this.questionarie);

    this._formsService.llenarCuestionario(this.questionarie).subscribe(
      res => {
        if(res == 'Done'){
          this._snackBar.open(`Formulario llenado correctamente`, "", {
            duration: 2000,
            panelClass: "snackbar-success",
            verticalPosition: "top",
            horizontalPosition: "right"
          });
          this.ngOnInit();
        }else{
          this._snackBar.open(`No se ha podido llenar el formulario`, "", {
            duration: 2000,
            panelClass: "snackbar-error ",
            verticalPosition: "top",
            horizontalPosition: "right"
          });
        }
      },
      err => {
        alert(err);
      }
    )

  }

}

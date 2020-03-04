import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-builder-view',
  templateUrl: './builder-view.component.html',
  styleUrls: ['./builder-view.component.scss']
})
export class BuilderViewComponent implements OnInit {

  nombreUsuario: string;

  constructor(private _formsService: FormsService, private _authService: AuthService,
    private router: Router, private fb: FormBuilder) { }

     formulario = this.fb.group({
       Nombre: ['', Validators.required],
       Descripcion: [''],
       preguntas: this.fb.array([
         this.fb.control('')
       ])
     });

  ngOnInit(): void {
    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;
  }

  logOut(){
    this._authService.logOut();
  }

  crearFormulario(){
    console.log(this.formulario.value);
  }

  get preguntas(){
    return this.formulario.get('preguntas') as FormArray;
  }

  agregarPregunta(){
    this.preguntas.push(this.fb.control(''));
  }

}

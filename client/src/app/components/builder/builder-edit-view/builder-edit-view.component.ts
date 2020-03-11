import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormsService } from "src/app/services/forms.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cuestionario } from '../../../models/cuestionario';

@Component({
  selector: 'app-builder-edit-view',
  templateUrl: './builder-edit-view.component.html',
  styleUrls: ['./builder-edit-view.component.scss']
})
export class BuilderEditViewComponent implements OnInit {

  nombreUsuario: string;
  opcionMultiple: string;
  idCuestionario: string;
  cuestionarioEditar: Cuestionario;

  constructor(
    private _formsService: FormsService,
    private _authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  formulario = this.fb.group({
    Nombre: ["", Validators.required],
    Descripcion: ["", Validators.required],
    idUsuarioCreador: [localStorage.getItem('idUsuario')],
    preguntasAbiertas: this.fb.array([this.createAbierta()]),
    preguntasMultiples: this.fb.array([])
  });

  ngOnInit(): void {
    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene el id del Cuestionerio
    this.idCuestionario = this.activatedRoute.snapshot.paramMap.get('idCuestionario');
    console.log(this.idCuestionario);

    this._formsService.getFormById(this.idCuestionario).subscribe(
      res => {
        this.cuestionarioEditar = res;
        console.log(this.cuestionarioEditar);

        this.formulario.patchValue({
          Nombre: this.cuestionarioEditar.Nombre
        })

        // this.formulario.setControl('preguntasAbiertas', this.fb.array(this.cuestionarioEditar.preguntasAbiertas || []))

        //Setear preguntas multiples
        this.formulario.setControl('preguntasMultiples', this.fb.array(this.cuestionarioEditar.preguntasMultiples || []))

        console.log(this.preguntasMultiples.controls[0].value);

        this.preguntasMultiples.controls[0].get('texto').patchValue('yourEmailId@gmail.com');
        
        
      },
      error => console.log(error)
    )

  
    
  }

  getName(i) {
    return this.getControls()[i].value.name;
  }

  getControls() {
    return (<FormArray>this.formulario.get('preguntasMultiples')).controls;
  }

  logOut() {
    this._authService.logOut();
  }

  get Nombre() {
    return this.formulario.get('Nombre');
  }

  get Descripcion() {
    return this.formulario.get('Descripcion');
  }

  get preguntasAbiertas() {
    return this.formulario.get("preguntasAbiertas") as FormArray;
  }

  get preguntasMultiples() {
    return this.formulario.get("preguntasMultiples") as FormArray;
  }

  get opciones() {
    return this.formulario.get("opciones") as FormArray;
  }

  createAbierta(): FormGroup {
    return this.fb.group({
      texto: ''
    });
  }


  agregarPreguntaAbierta() {
    this.preguntasAbiertas.push(this.createAbierta());
  }


  ///MULTIPLES
  addNewPreguntaMultiple() {
    let control = this.formulario.controls.preguntasMultiples as FormArray;

    control.push(
      this.fb.group({
        texto: [""],
        opciones: this.fb.array([])
      })
    );
  }

  addNewOpcion(control) {
    control.push(this.fb.group({
      opcion: ''
    }));
  }

  //REMOVE PREGUNTAS
  deletePreguntaAbierta(index) {
    let control = <FormArray>this.formulario.controls.preguntasAbiertas;
    control.removeAt(index)
  }

  deletePreguntaMultiple(index) {
    let control = <FormArray>this.formulario.controls.preguntasMultiples;
    control.removeAt(index)
  }

  deleteOpcion(control, index) {
    control.removeAt(index);
  }

  /////ENVIAR FORMULARIO
  editarFormulario() {
    this._formsService.createForm(this.formulario.value).subscribe(
      res=>{
        this._snackBar.open(`Formulario creado correctamente`, "", {
          duration: 2000,
          panelClass: "snackbar-success-green",
          verticalPosition: "top",
          horizontalPosition: "right"
        });
      },
      error => {
        this._snackBar.open(`Error al crear el formulario`, "", {
          duration: 2000,
          panelClass: "snackbar-error",
          verticalPosition: "top",
          horizontalPosition: "right"
        });
      }
      
      );
  }

}

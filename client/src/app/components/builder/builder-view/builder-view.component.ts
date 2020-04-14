import { Component, OnInit, HostListener } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormsService } from "src/app/services/forms.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cuestionario } from '../../../models/cuestionario';

@Component({
  selector: "app-builder-view",
  templateUrl: "./builder-view.component.html",
  styleUrls: ["./builder-view.component.scss"]
})
export class BuilderViewComponent implements OnInit {

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
    preguntasMultiples: this.fb.array([]),
    seleccionMultiple: this.fb.array([])
  });

  ngOnInit(): void {
    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;   
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

  get seleccionMultiple() {
    return this.formulario.get("seleccionMultiple") as FormArray;
  }

  get opciones() {
    return this.formulario.get("opciones") as FormArray;
  }

  createAbierta(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required]
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
        texto: ["", Validators.required],
        opciones: this.fb.array([])
      })
    );
  }

  addNewSeleccionMultiple() {
    let control = this.formulario.controls.seleccionMultiple as FormArray;

    control.push(
      this.fb.group({
        texto: ["", Validators.required],
        opciones: this.fb.array([])
      })
    );
  }

  addNewOpcion(control) {
    
    console.log(control);

    control.push(this.fb.group({
      opcion: ['', Validators.required]
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

  deleteSeleccionMultiple(index) {
    let control = <FormArray>this.formulario.controls.seleccionMultiple;
    control.removeAt(index)
  }

  deleteOpcion(control, index) {
    control.removeAt(index);
  }

  /////ENVIAR FORMULARIO
  crearFormulario() {
    console.warn(this.formulario.value);
    this._formsService.createForm(this.formulario.value).subscribe(
      res=>{
        this._snackBar.open(`Formulario creado correctamente`, "", {
          duration: 2000,
          panelClass: "snackbar-success-green",
          verticalPosition: "top",
          horizontalPosition: "right"
        });

        setTimeout(()=>{    //<<<---    using ()=> syntax
          window.location.reload();
     }, 1000);
        
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

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signup-view",
  templateUrl: "./signup-view.component.html",
  styleUrls: ["./signup-view.component.scss"]
})
export class SignupViewComponent implements OnInit {
  //Formulario
  signUpForm: FormGroup;

  //Validaciones
  public userExists: boolean = false;
  public equalPassowords: boolean = false;
  public emptyFields: boolean = false;
  public hasReponse: boolean = false;

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.signUpForm = this.createFormGroup();
  }

  ngOnInit(): void {}

  get Nombre() {
    return this.signUpForm.get("Nombre");
  }

  get Contrasena() {
    return this.signUpForm.get("Contrasena");
  }

  get ConfirmContrasena() {
    return this.signUpForm.get("ConfirmContrasena");
  }

  signUp() {

    this.emptyFields = false;

    console.log(this.signUpForm.value);

    if (
      this.signUpForm.get("Nombre").value == "" ||
      this.signUpForm.get("Contrasena").value == "" ||
      this.signUpForm.get("ConfirmContrasena").value == ""
    ) {
      this.emptyFields =true;
    } else {
      //Verifica las contraseñas iguales
      if (
        this.signUpForm.get("Contrasena").value !==
        this.signUpForm.get("ConfirmContrasena").value
      ) {
        this.signUpForm.addControl("ConfirmContrasena", new FormControl(""));
        this.equalPassowords = true;
      } else {
        this.hasReponse = true;
        this.equalPassowords = false;
        this.userExists = false;

        //Removemos el field ConfirmContrasena porque solo era para validar
        this.signUpForm.removeControl("ConfirmContrasena");

        this._authService.register(this.signUpForm.value).subscribe(
          res => {
            this.hasReponse = false;

            console.log(res);

            //Si el usuario ya existe..
            if (res.message == "alreadyExists") {
              this.signUpForm.addControl(
                "ConfirmContrasena",
                new FormControl("")
              );
              this.userExists = true;
            } else {
              this.userExists = false;
              this._snackBar.open(`Registro completado correctamente`, "", {
                duration: 2000,
                panelClass: "snackbar-success",
                verticalPosition: "top",
                horizontalPosition: "right"
              });
              //Lo agregamos de nuevo para limpiar el formulario
              this.signUpForm.addControl(
                "ConfirmContrasena",
                new FormControl("")
              );
              this.resetForm();
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  createFormGroup() {
    return new FormGroup({
      Nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      Contrasena: new FormControl("", [Validators.required, Validators.minLength(4)]),
      ConfirmContrasena: new FormControl("", [Validators.required])
    });
  }

  resetForm() {
    this.signUpForm.reset();
  }
}

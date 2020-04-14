import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { userPasswordValidator } from 'src/app/validators/userPassword.validator';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup;

  //Validaciones
  public incorrectPassword: boolean = false;
  public userDoesntExists: boolean = false;
  public hasReponse: boolean = false;

  constructor(private _authService: AuthService, private router: Router) {
    this.loginForm = this.createFormGroup();
   }

  ngOnInit(): void {

  }

  get Nombre() {
    return this.loginForm.get('Nombre');
  }

  get Contrasena() {
    return this.loginForm.get('Contrasena');
  }

  login(){

    this.hasReponse = true;
    this.incorrectPassword = false;
    this.userDoesntExists = false;

    console.log(this.loginForm.value);

    this._authService.login(this.loginForm.value).subscribe(res =>{

      console.log(res);

      this.hasReponse = false;

      if(res.message == 'userDoesntExists'){
        this.userDoesntExists = true;

      }else if(res.message == 'incorrectPassword'){
          this.incorrectPassword = true;
      }else{
        this.router.navigate(['/formularios']);
      }

    },
    error => {
      console.log(error)
    });
  }

  createFormGroup(){
    return new FormGroup({
      Nombre: new FormControl('', [Validators.required, userPasswordValidator]),
      Contrasena: new FormControl('', [Validators.required, userPasswordValidator])
    })
  }

  resetForm(){
    this.loginForm.reset();
  }

}

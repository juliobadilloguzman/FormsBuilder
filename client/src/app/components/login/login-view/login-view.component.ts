import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _authService: AuthService) {
    this.loginForm = this.createFormGroup();
   }

  ngOnInit(): void {
    
  }

  login(){
    console.log(this.loginForm.value);
    this._authService.login(this.loginForm.value).subscribe(res =>{
      console.log(res);
    },
    error => {
      console.log(error)
    });
  }

  createFormGroup(){
    return new FormGroup({
      Nombre: new FormControl(''),
      Contrasena: new FormControl('')
    })
  }

}

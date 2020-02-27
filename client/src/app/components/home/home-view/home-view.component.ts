import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  isLogged: boolean;

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    // localStorage.removeItem('idUsuario');
    // localStorage.removeItem('userToken');
    this.isLogged = this._authService.isLoggedIn();
  }

  goToLogin(): void{
    this.router.navigate(['/login'])
  }

  goToSignUp(): void{
    this.router.navigate(['/registro'])
  }

  goToForms(): void{
    this.router.navigate(['/formularios'])
  }

}

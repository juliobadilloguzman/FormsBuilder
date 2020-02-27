import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { TokenResponse } from '../models/tokenresponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  //Servidor
  API_URI = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  private setToken(token: string): void{

    //Guarda en el localStorage el token del usuario
    localStorage.setItem('userToken', token);
    this.token = token;
  }

  private getToken(): string{

    //Si no hay token, lo obtiene
    if(!this.token){
      this.token = localStorage.getItem('userToken');
    }

    return this.token;

  }

  public getUserDetails(): User {
    const token = this.getToken()
    let payload;
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: User): Observable<any>{

    const request = this.http.post(`${this.API_URI}/signup`, user).pipe(map((data: TokenResponse) => {
      if(data.token){
        this.setToken(data.token);
      }
      return data;
    }));

    return request;

  }

  public login(user: User): Observable<any>{

    const request = this.http.post(`${this.API_URI}/login`, user).pipe(map((data: TokenResponse) => {
      if(data.token){
        this.setToken(data.token);
        localStorage.setItem("idUsuario", this.getUserDetails().idUsuario.toString());
      }
      return data;
    }));

    return request;

  }

  public profile(): Observable<any>{
    return this.http.get(`${this.API_URI}/profile`, {
      headers: {Authorization: `${this.getToken()}`}
    });
  }

  public logOut(): void{
    this.token = "";
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('idUsuario');
    this.router.navigate(['/']);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  //Servidor
  API_URI = 'http://localhost:3000/form';


  constructor(private http: HttpClient, private router: Router) { }

  getFormsByUserId(idCreador: string | number){
    return this.http.post<Cuestionario[]>(`${this.API_URI}/getForms`, {idCreador: idCreador});
  }

  createForm(formulario): Observable<any>{
    console.warn('He creado el formulario');
    console.log(formulario);
    return this.http.post(`${this.API_URI}/createform`, formulario);
  }

  getFormById(id: number | string):Observable<any>{
    console.warn('Obtieniendo cuestionario...');
    return this.http.get(`${this.API_URI}/${id}`);
  }

}

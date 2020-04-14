import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cuestionario } from '../models/cuestionario';
import { UsuarioLlenado } from '../models/usuariollenado';
import { CuestionarioLlenado } from '../models/cuestionariollenado';
import { CuestionarioGrafica } from '../models/cuestionarioGrafica';
import { CuestionarioGeneralInfo } from '../models/cuestionarioGeneralInfo';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  //Servidor
  API_URI = 'http://localhost:3000/form';


  constructor(private http: HttpClient, private router: Router) { }

  getFormsByUserId(idCreador: string | number) {
    return this.http.post<Cuestionario[]>(`${this.API_URI}/getForms`, { idCreador });
  }

  createForm(formulario): Observable<any> {
    console.warn('He creado el formulario');
    console.log(formulario);
    return this.http.post(`${this.API_URI}/createform`, formulario);
  }

  getFormById(id: number | string): Observable<any> {
    console.warn('Obtieniendo cuestionario...');
    return this.http.get(`${this.API_URI}/${id}`);
  }

  getUsersByFormId(idCuestionario: number | string): Observable<UsuarioLlenado[]> | Observable<any> {
    console.warn('Obtieniendo usuarios del cuestionario...');
    return this.http.get<UsuarioLlenado[]>(`${this.API_URI}/${idCuestionario}/answers`);
  }

  deleteForm(idCuestionario: number | string) {
    console.warn('Eliminando cuestionario...');
    return this.http.delete(`${this.API_URI}/${idCuestionario}`);
  }

  getUserAnswersByFormAndUserId(idCuestionario: string | number, idUsuario: string | number): Observable<CuestionarioLlenado[]> {
    console.warn('Obtieniendo usuarios del cuestionario...');
    return this.http.get<CuestionarioLlenado[]>(`${this.API_URI}/${idCuestionario}/user/${idUsuario}`);
  }

  llenarCuestionario(formulario: any): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/fillForm`, formulario);
  }

  getFormGraphData(idCuestionario: string | number) {
    console.warn('Obteniendo los datos de las gráficas...');
    return this.http.get<CuestionarioGrafica>(`${this.API_URI}/${idCuestionario}/graphs`);
  }

  getAllFormsByDate() {
    console.warn('Obteniendo los datos de los formularios...');
    return this.http.get<CuestionarioGeneralInfo[]>(`${this.API_URI}/getFormsByDate`);
  }
}

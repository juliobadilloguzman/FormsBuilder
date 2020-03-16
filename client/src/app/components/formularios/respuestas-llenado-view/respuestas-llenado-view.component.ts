import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioLlenado } from 'src/app/models/cuestionariollenado';

@Component({
  selector: 'app-respuestas-llenado-view',
  templateUrl: './respuestas-llenado-view.component.html',
  styleUrls: ['./respuestas-llenado-view.component.scss']
})
export class RespuestasLlenadoViewComponent implements OnInit {

  //Sticky Menu
  @ViewChild('stickyMenu') menuElement: ElementRef;


  nombreUsuario: string;
  idUsuario: number;
  idCuestionario: number;
  cuestionario: Cuestionario;
  respuestas: CuestionarioLlenado[];

  nombreFormulario: string;
  descripcionFormulario: string;

  hasResponse = false;

  constructor(private _authService: AuthService, private _formsService: FormsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //Obtiene el nombre de usuario
    this.nombreUsuario = this._authService.getUserDetails().Nombre;

    //Obtiene el id del cuestionario
    this.idCuestionario = parseInt(this.activatedRoute.snapshot.paramMap.get('idFormulario'));
    console.log(this.idCuestionario);

    this.idUsuario = parseInt(this.activatedRoute.snapshot.paramMap.get('idUsuario'));
    console.log(this.idUsuario);

  
    //Obtiene el Cuestionario
    this._formsService.getFormById(this.idCuestionario).subscribe(
      res => {
        this.hasResponse=true;
        this.cuestionario = res;
        this.nombreFormulario = this.cuestionario.Nombre;
        this.descripcionFormulario = this.cuestionario.Descripcion;
      },
      err => console.error(err)
    )

    //Obtiene respuestas
    this._formsService.getUserAnswersByFormAndUserId(this.idCuestionario, this.idUsuario).subscribe(
      res =>{
        console.log(res);
        this.respuestas = res;
      },
      err => alert(err)
    )

  }

 
  logOut(){
    this._authService.logOut();
  }

}

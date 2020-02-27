import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formularios-view',
  templateUrl: './formularios-view.component.html',
  styleUrls: ['./formularios-view.component.scss']
})
export class FormulariosViewComponent implements OnInit {

  idUsuario: number;

  constructor() { 
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));
  }

  ngOnInit(): void {
  }

}

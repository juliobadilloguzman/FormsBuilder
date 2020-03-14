import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-fill-view',
  templateUrl: './fill-view.component.html',
  styleUrls: ['./fill-view.component.scss']
})
export class FillViewComponent implements OnInit {

  idCuestionario: string|number;

  constructor(private _formService: FormsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.idCuestionario = this.activatedRoute.snapshot.paramMap.get('idCuestionario');

    this._formService.getFormById(this.idCuestionario).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

}

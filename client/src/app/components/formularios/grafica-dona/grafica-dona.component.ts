import { Component, OnInit, Input } from '@angular/core';
import { PreguntaMultiple } from 'src/app/models/preguntaMultiple';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styleUrls: ['./grafica-dona.component.scss']
})
export class GraficaDonaComponent implements OnInit {

  @Input()
  preguntaJson: PreguntaMultiple;

  chartLabel: string;
  chartData: number[];
  chartLabels: string[];
  chartDatasets: Array<any>;

  public chartType = 'doughnut';

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor() { }

  ngOnInit(): void {
    this.chartLabel = this.preguntaJson.texto;
    this.chartData = [];
    this.chartLabels = [];

    this.preguntaJson.opciones.forEach(element => {
      this.chartData.push(element.Votos);
      this.chartLabels.push(element.Texto);
    });

    this.chartDatasets = [
      { data: this.chartData, label: this.chartLabel }
    ];

  }

}

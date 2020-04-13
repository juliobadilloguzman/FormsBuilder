import { Component, OnInit, Input } from '@angular/core';
import { PreguntaMultiple } from 'src/app/models/preguntaMultiple';

@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrls: ['./grafica-barras.component.scss']
})
export class GraficaBarrasComponent implements OnInit {

  @Input()
  preguntaJson: PreguntaMultiple;

  chartLabel: string;
  chartData: number[];
  chartLabels: string[];
  chartDatasets: Array<any>;

  public chartType = 'bar';

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
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
      this.chartData.push(element.Porcentaje);
      this.chartLabels.push(element.Texto);
    });

    this.chartDatasets = [
      { data: this.chartData, label: this.chartLabel }
    ];

  }

}

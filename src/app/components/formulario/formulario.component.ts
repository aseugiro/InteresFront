import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { Calculo } from 'src/app/model/calculo';
import { serie } from 'src/app/model/serie';
import { OperacionService } from 'src/app/Services/operacion.service';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { Series } from 'd3';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [OperacionService]
})
export class FormularioComponent implements OnInit   {
 
  public calculo:Calculo;
  public resultado:String;
  public interesSimple:serie[]=[];
  public interesCompuesto:serie[]=[];
  public update$: Subject<boolean> = new Subject<boolean>();

 

  ChartcustomColors=[
    { name: "Interes compuesto", value: '#0000FF' },
    { name: "Interes Simple", value: '#ff0000' }
  ];

  chartData= [
    {
      "name": "Interes compuesto",
      "series": new Array<{name: string, value: number}>(),
    },
    {
      "name": "Interes Simple",
      "series": new Array<{name: string, value: number}>(),
    }
   
  ];
  view: [number, number] = [700, 300]; // Width and height of the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showGridLines = true;
  xAxisLabel = 'Año';
  yAxisLabel = 'Interes';
  showXAxisLabel=true;
  showYAxisLabel=true;
  timeline = false;

  

  constructor(
    private _operacionService: OperacionService
  ) { 
   
      this.resultado='';
      this.calculo=new Calculo(0,0,0);
    }

  

  ngOnInit(): void {
    
     
  }
  
  drawGraph():void{
    this.chartData[0].series=new Array<{name: string, value: number}>();
    this.chartData[1].series=new Array<{name: string, value: number}>();
    this.interesCompuesto.forEach(element => {
      this.chartData[0].series.push({"name":element.anio.toString(),"value":element.monto})
    });

    this.interesSimple.forEach(element => {
      this.chartData[1].series.push({"name":element.anio.toString(),"value":element.monto})
    });
    this.chartData = [...this.chartData]
    this.update$.next(true);
  }

  onSubmit(){
    console.log(this.calculo);
    this._operacionService.postInteres(this.calculo).subscribe(
      response=>{
        this.resultado=response;
        this.interesSimple=response.interes_simple;
        this.interesCompuesto=response.interes_compuesto;
        this.drawGraph();
      },
      exception =>{
        console.log(exception);
        this.resultado=exception.error.error;
      }

    )
  }
}

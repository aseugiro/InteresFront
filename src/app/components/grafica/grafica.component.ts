import { Component, OnInit } from '@angular/core';
import {single} from './data';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent  {

  single= [];
   view: any[] = [700, 400];
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   showXAxisLabel = true;
   xAxisLabel= "Years";
   showYAxisLabel = true;
   yAxisLabel= "Salary";
   graphDataChart= [];
   colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
   constructor() {
    Object.assign(this, { single })
  }

}

import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { UserResponse } from '../types/response/UserResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';
declare var moment: any;

@Component({
  selector: 'app-reporte-deudas',
  templateUrl: './reporte-deudas.component.html',
  styleUrls: ['./reporte-deudas.component.css']
})
export class ReporteDeudasComponent implements OnInit {

  id_anio: string;

  years: YearResponse[];

  deudores: UserResponse[];

  // Para calcular los tiempos de consulta
  tiempo_inicio: string;
  tiempo_fin: string;
  tiempo: string = "";

  constructor(
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
    this.getListYear();
  }

  getListYear() {
    this.anioService.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data;
        this.years = this.years.map(year => {
          year.id_anio = year.id_año;
          return year;
        })
      }
    })
  }

  buscar() {
    this.anioService.getDeudas(this.id_anio).subscribe(response => {
      this.tiempo_fin = moment().format("hh:mm:ss:SSS");
      console.log("Captura de fin tiempo: ", this.tiempo_fin);
      this.diferenciaTiempo();
      if (response.success) {
        if(response.data.length > 0) {
          this.deudores = response.data;
        } else {
          toastr.info("No hay estudiantes deudores");
        }
      } else {
        toastr.info("No hay estudiantes deudores");
      }
    })
  }
  
  seleccionar($event) {
    this.tiempo_inicio = moment().format("hh:mm:ss:SSS");
    console.log("Captura de inicio tiempo: ", this.tiempo_inicio);
  }

  diferenciaTiempo() {
    var day1 = moment().zone('GMT');
    var splitTime1 = this.tiempo_inicio.split(/:/);
    day1.hours(parseInt(splitTime1[0])).minutes(parseInt(splitTime1[1])).seconds(parseInt(splitTime1[2])).milliseconds(parseInt(splitTime1[3]));
    
    var day2 = moment().zone('GMT');
    var splitTime2 = this.tiempo_fin.split(/:/);
    day2.hours(parseInt(splitTime2[0])).minutes(parseInt(splitTime2[1])).seconds(parseInt(splitTime2[2])).milliseconds(parseInt(splitTime2[3]));
  
    let miliseconds = day2.diff(day1, 'miliseconds');
    this.tiempo = `Tiempo de consulta: ${miliseconds/1000}  segundos`;
  }
}

import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { UserResponse } from '../types/response/UserResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-reporte-deudas',
  templateUrl: './reporte-deudas.component.html',
  styleUrls: ['./reporte-deudas.component.css']
})
export class ReporteDeudasComponent implements OnInit {

  id_anio: string;

  years: YearResponse[];

  deudores: UserResponse[];

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

}

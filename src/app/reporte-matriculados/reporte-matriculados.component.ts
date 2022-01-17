import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { FileResponse } from '../types/response/FileResponse';
import { UserResponse } from '../types/response/UserResponse';
import { YearResponse } from '../types/response/YearReponse';

@Component({
  selector: 'app-reporte-matriculados',
  templateUrl: './reporte-matriculados.component.html',
  styleUrls: ['./reporte-matriculados.component.css']
})
export class ReporteMatriculadosComponent implements OnInit {

  years: YearResponse[];
  alumnos: UserResponse[];
  files: FileResponse[];

  anio: number;

  constructor(
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
    this.getAnios();
  }

  getAnios() {
    this.anioService.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data;
        console.log(this.years);
        this.years = this.years.map(year => {
          year.id_anio = year.id_año;
          return year;
        })
      }
    });
  }

  getMatriculados() {
    this.anioService.getAlumnos(this.anio).subscribe(response => {
      if (response.success) {
        this.alumnos = response.data;
      } else {
        this.alumnos = [];
      }
    });
  }

}

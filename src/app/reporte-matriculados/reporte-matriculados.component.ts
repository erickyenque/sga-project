import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { FileResponse } from '../types/response/FileResponse';
import { UserResponse } from '../types/response/UserResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as html2pdf from 'html2pdf.js';

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

  generarPdf() {    
    let element = document.getElementById('example1');
    var element2 = document.createElement('h3');
    var element3 = document.createElement('br');
    element2.append('REPORTE DE MATRICULADOS');
    var elementToPrint = document.createElement('div');   
    elementToPrint.appendChild(element2.cloneNode(true));
    elementToPrint.appendChild(element3.cloneNode(true));
    elementToPrint.appendChild(element.cloneNode(true));

    let opt = {
      margin: 1,
      filename: `REPORTE_MATRICULADOS.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(elementToPrint).set(opt).save();
  }

}

import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { FileResponse } from '../types/response/FileResponse';
import { UserResponse } from '../types/response/UserResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as html2pdf from 'html2pdf.js';
declare var $: any;

@Component({
  selector: 'app-reporte-matriculados',
  templateUrl: './reporte-matriculados.component.html',
  styleUrls: ['./reporte-matriculados.component.css']
})
export class ReporteMatriculadosComponent implements OnInit {

  years: YearResponse[];
  alumnos: UserResponse[];
  showButton = false;
  anio: number;

  constructor(
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
    this.getAnios();
    this.setConfigB();
  }

  setConfigB() {
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    $('#datemask2').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
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
    let fecha1 = $('#datemask').val();
    let fecha2 = $('#datemask2').val();
    this.anioService.getAlumnos(this.anio, fecha1, fecha2).subscribe(response => {
      if (response.success) {
        this.showButton = true;
        this.alumnos = response.data;
      } else {
        this.alumnos = [];
        this.showButton = false;
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

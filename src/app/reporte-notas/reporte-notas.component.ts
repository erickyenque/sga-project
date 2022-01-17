import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import { NotasResponse } from '../types/response/NotasResponse';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reporte-notas',
  templateUrl: './reporte-notas.component.html',
  styleUrls: ['./reporte-notas.component.css']
})
export class ReporteNotasComponent implements OnInit {

  user: UserRequest = {
    dni: "",
    nombres: "",
    apePaterno: "",
    apeMaterno: "",
    direccion: "",
    referencia: "",
    genero: "",
    nickname: "",
    password: "",
    role: "",
    id_anio: "",
    pago: "",
    monto: 0
  }

  materias: NotasResponse[];
  showButton = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  buscarEstudiante() {
    this.userService.datosUsuarioxDni(this.user.dni).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];     
        this.notasMaterias();   
      }
    })
  }

  notasMaterias() {
    this.userService.notasMaterias(this.user.id_persona).subscribe(response => {
      if (response.success) {
        this.showButton = true;
        this.materias = response.data;        
      } else {
        this.showButton = false;
        this.materias = [];  
      }
    })
  }

  generarPdf() {    
    let element = document.getElementById('example1');
    var element2 = document.createElement('h3');
    var element3 = document.createElement('br');
    element2.append('REPORTE DE NOTAS');
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

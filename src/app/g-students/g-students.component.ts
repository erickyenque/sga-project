import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../types/response/UserResponse';
declare var $: any;
import * as html2pdf from 'html2pdf.js';
import { StudentResponse } from '../types/response/StudentResponse';

@Component({
  selector: 'app-g-students',
  templateUrl: './g-students.component.html',
  styleUrls: ['./g-students.component.css']
})
export class GStudentsComponent implements OnInit {

  users: UserResponse[];
  user: StudentResponse = null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  setConfigM() {
    $(function () {
      $("#example1").DataTable();
    });
  }

  getList() {
    this.userService.listEstudiantes().subscribe(response => {
      if (response.success) {
        this.users = response.data;
        this.setConfigM();
      }
    })
  }

  download(id_persona: number) {
    this.userService.datosEstudiante(id_persona).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];
        console.log(this.user);
        let element = this.getHtmlPdf();
        let opt = {
          margin: 1,
          filename: `CONSTANCIA_MATRICULA_${this.user.id_matricula.padStart(6, '0')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        html2pdf().from(element).set(opt).save();
      }
    })
  }

  getHtmlPdf() {
    let date = new Date(this.user.fecha_registro);
    let html = `
    <img src="assets/imgs/college.png" alt="" class="img-fluid text-center" width="100">
    <br>
    <br>
    <h3>CONSTANCIA DE MATRICULA</h3>
    <br>
    <table id="example1" class="table table-bordered table-striped">
      <tbody>
        <tr>
          <td>N° MATRICULA</td>                       
          <td>${this.user.id_matricula.padStart(6, '0')}</td>
        </tr>
        <tr>
          <td>NOMBRE DEL ALUMNO</td>
          <td>${this.user.nombres + " " + this.user.apePaterno + " " + this.user.apeMaterno}</td>
        </tr>
        <tr>
          <td>ESTADO MATRICULA</td>                        
          <td>${this.user.estado}</td>
        </tr>
        <tr>                     
          <td>AÑO</td>
          <td>${this.user.nombre}</td>
        </tr>
        <tr>                     
          <td>GRADO</td>
          <td>${this.user.numero}</td>
        </tr>
        <tr>                     
          <td>SECCION</td>
          <td>${this.user.seccion}</td>
        </tr>
        <tr>                     
          <td>TURNO</td>
          <td>${this.user.turno}</td>
        </tr>
        <tr>                      
          <td>FECHA</td>
          <td>${date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</td>
        </tr>
        <tr>                      
          <td>MONTO</td>
          <td>S/ ${this.user.monto}</td>
        </tr>
      </tbody>  
    </table>
    <br>
    <br>
    <p style="font-size: 12px;font-style: italic;">Este es un documento que valida la matriculación del alumno en la escuela. 
    Este documento puede ser solcitado y entregado el momento que lo necesite.
    Para cualquier información llamar al número: 999 999 999</p>
    `;
    return `<div class="container text-center">${html}</div>`;
  }
}

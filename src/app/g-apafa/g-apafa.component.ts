import { Component, OnInit } from '@angular/core';
import { ApafaService } from '../services/apafa.service';
import { UserService } from '../services/user.service';
import { StudentResponse } from '../types/response/StudentResponse';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-g-apafa',
  templateUrl: './g-apafa.component.html',
  styleUrls: ['./g-apafa.component.css']
})
export class GApafaComponent implements OnInit {

  apafas: any[] = [];
  user: StudentResponse;

  constructor(
    private apafaService: ApafaService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.apafaService.listar().subscribe(response => {
      if(response.success) {
        this.apafas = response.data;
        console.log(response.data)
      }
    })
  }

  download(apafa: any) {
    this.userService.datosEstudiante(apafa.id_persona).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];
        console.log(this.user);
        let element = this.getHtmlPdf(apafa);
        let opt = {
          margin: 1,
          filename: `CONSTANCIA_PAGO_APAFA_${this.user.id_matricula.padStart(6, '0')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        html2pdf().from(element).set(opt).save();
      }
    })
  }

  getHtmlPdf(apafa: any) {
    let date = new Date(this.user.fecha_registro);
    let html = `
    <img src="assets/imgs/college.png" alt="" class="img-fluid text-center" width="100">
    <br>
    <br>
    <h3>CONSTANCIA DE PAGO DE APAFA</h3>
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
          <td>PAGO DE APAFA</td>                        
          <td>${apafa.estadoA}</td>
        </tr>
        <tr>                      
          <td>MONTO</td>
          <td>S/ ${apafa.monto}</td>
        </tr>
      </tbody>  
    </table>
    <br>
    <br>
    <a href="https://api-seguridad.sunat.gob.pe/v1/clientessol/4f3b88b3-d9d6-402a-b85d-6a0bc857746a/oauth2/loginMenuSol?originalUrl=https://e-menu.sunat.gob.pe/cl-ti-itmenu/AutenticaMenuInternet.htm&state=rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAAEZXhlY3B0AAZwYXJhbXN0AEsqJiomL2NsLXRpLWl0bWVudS9NZW51SW50ZXJuZXQuaHRtJmI2NGQyNmE4YjVhZjA5MTkyM2IyM2I2NDA3YTFjMWRiNDFlNzMzYTZ0AANleGVweA==">https://api-seguridad.sunat.gob.pe</a>
    <br>
    <br>
    <p style="font-size: 12px;font-style: italic;">Este es un documento que valida la matriculación del alumno en la escuela. 
    Este documento puede ser solcitado y entregado el momento que lo necesite.
    Para cualquier información llamar al número: 999 999 999</p>
    `;
    return `<div class="container text-center">${html}</div>`;
  }
}

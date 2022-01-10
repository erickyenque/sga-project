import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { ApafaService } from '../services/apafa.service';
import { UserService } from '../services/user.service';
import { PagoApafaRequest } from '../types/request/PagoApafaRequest';
import { UserRequest } from '../types/request/UserRequest';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-pagos-apaga',
  templateUrl: './pagos-apaga.component.html',
  styleUrls: ['./pagos-apaga.component.css']
})
export class PagosApagaComponent implements OnInit {

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

  years: YearResponse[];

  apafa: PagoApafaRequest = {
    estado: "",
    monto: 0,
    id_estudiante: "",
    id_año: ""
  }

  constructor(
    private userService: UserService,
    private anioService: AnioService,
    private apafaService: ApafaService
  ) { }

  ngOnInit(): void {
    this.getListYear();
  }

  buscarEstudiante() {
    this.userService.datosUsuarioxDni(this.user.dni).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];
        this.userService.datosEstudiante(this.user.id_persona).subscribe(response => {
          if (response.success) {
            this.user.id_anio = response.data[0].id_año;
          }
        })
      }
    })
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

  clearFields() {
    this.apafa.estado = "";
    this.apafa.monto = 0;
  }


  addPago() {
    this.apafa.id_estudiante = this.user.id_persona.toString();
    this.apafa.id_año = this.user.id_anio;

    this.apafaService.addPago(this.apafa).subscribe(response => {
      if (response.success) {
        toastr.success('Pago registrado!');
        this.clearFields();
      } else {
        toastr.error('Error al guardar');
      }
    })
  }

}

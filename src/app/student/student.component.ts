import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';
import { MatriculaService } from '../services/matricula.service';
import { MatricularRequest } from '../types/request/MatricularRequest';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  years: YearResponse[];

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
    pago: ""
  }

  constructor(
    private userService: UserService,
    private anioSerive: AnioService,
    private matriculaService: MatriculaService
  ) { }

  ngOnInit(): void {
    this.getListYear();
  }

  getListYear() {
    this.anioSerive.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data;
        this.years = this.years.map(year => {
          year.id_anio = year.id_año;
          return year;
        })
      }
    })
  }

  buscarEstudiante() {
    this.userService.datosUsuarioxDni(this.user.dni).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];
      }
    })
  }

  clearFields() {
    this.user = {
      dni: "",
      nombres: "",
      apePaterno: "",
      apeMaterno: "",
      direccion: "",
      referencia: "",
      genero: "",
      nickname: "",
      password: "",
      role: ""
    }
  }

  finalizarMatricula() {
    let student: MatricularRequest = {
      id_estudiante: this.user.id_persona.toString(),
      id_anio: this.user.id_anio,
      pago: this.user.pago,
      estado: this.user.pago == '0'? 'PENDIENTE': 'MATRICULADO'
    }
    this.matriculaService.matricularEstudiante(student).subscribe(response => {
      if (response.success) {
        toastr.success("Matricula exitosa!");
        this.clearFields();
      } else {
        toastr.error("Hubo un problema!");
      }
    })
  }
}

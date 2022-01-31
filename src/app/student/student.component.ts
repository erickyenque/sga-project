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
    pago: "",
    monto: 0
  }

  disabled: boolean = true;

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
    if (this.user.dni.trim() !== "") {
      this.userService.datosUsuarioxDni(this.user.dni).subscribe(response => {
        if (response.success) {
          this.user = response.data[0];
          this.disabled = false;
        } else {
          toastr.info("Estudiante no encontrado");
          this.disabled = true;
        }
      })
    } else {
      toastr.info("Ingrese dni");
    }
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

  validarCampos(student: MatricularRequest) {
    return student.id_estudiante !== "" && student.id_anio !== "" && student.pago !== "" &&
      student.estado !== "";
  }

  finalizarMatricula() {
    let student: MatricularRequest = {
      id_estudiante: this.user.id_persona.toString(),
      id_anio: this.user.id_anio,
      monto: this.user.monto,
      pago: this.user.pago,
      estado: this.user.pago == '0' ? 'PENDIENTE' : 'MATRICULADO'
    }
    if (this.validarCampos(student)) {
      this.matriculaService.matricularEstudiante(student).subscribe(response => {
        if (response.success) {
          toastr.success("Matricula exitosa!");
          this.clearFields();
        } else {
          toastr.error("Hubo un problema!");
        }
      })
    } else {
      toastr.info("Complete campos vacíos");
    }
  }
}

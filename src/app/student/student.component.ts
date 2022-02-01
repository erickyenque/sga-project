import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';
import { MatriculaService } from '../services/matricula.service';
import { MatricularRequest } from '../types/request/MatricularRequest';
declare var moment: any;

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

  // Para calcular los tiempos de consulta
  tiempo_inicio: string;
  tiempo_fin: string;
  tiempo: string = "";

  presionado: boolean = false;

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
        this.tiempo_fin = moment().format("hh:mm:ss:SSS");
        console.log("Captura de fin tiempo: ", this.tiempo_fin);
        this.diferenciaTiempo();
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

  seleccionar($event) {
    if (!this.presionado || this.user.dni.length === 1) {
      this.tiempo_inicio = moment().format("hh:mm:ss:SSS");
      console.log("Captura de inicio tiempo: ", this.tiempo_inicio);
      this.presionado = true;
    }
  }

  diferenciaTiempo() {
    var day1 = moment().zone('GMT');
    var splitTime1 = this.tiempo_inicio.split(/:/);
    day1.hours(parseInt(splitTime1[0])).minutes(parseInt(splitTime1[1])).seconds(parseInt(splitTime1[2])).milliseconds(parseInt(splitTime1[3]));
    
    var day2 = moment().zone('GMT');
    var splitTime2 = this.tiempo_fin.split(/:/);
    day2.hours(parseInt(splitTime2[0])).minutes(parseInt(splitTime2[1])).seconds(parseInt(splitTime2[2])).milliseconds(parseInt(splitTime2[3]));
  
    let miliseconds = day2.diff(day1, 'miliseconds');
    this.tiempo = `Tiempo de registro de matrícula: ${miliseconds/1000}  segundos`;
  } 
}

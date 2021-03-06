import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { UserService } from '../services/user.service';
import { YearTeacherService } from '../services/year-teacher.service';
import { TeacherYearRequest } from '../types/request/TeacherYearRequest';
import { DatosResponse } from '../types/response/DatosResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';
import { MateriasYearResponse } from '../types/response/MateriasYearResponse';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacherYear: TeacherYearRequest = {
    id_anio: "",
    id_anio_materia: "",
    id_docente: ""
  };

  docentes: DatosResponse[];
  years: YearResponse[];
  materias: MateriasYearResponse[];

  constructor(
    private anioService: AnioService,
    private userService: UserService,
    private teacherYearService: YearTeacherService
  ) { }

  ngOnInit(): void {
    this.getDocentes();
    this.getAnios();
  }

  getDocentes() {
    this.userService.listDocentes().subscribe(response => {
      if (response.success) {
        this.docentes = response.data;
      }
    })
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

  clearFields() {
    this.teacherYear.id_docente = "";
  }

  validarCampos() {
    return this.teacherYear.id_anio.trim() !== "" && this.teacherYear.id_anio_materia.trim() !== "" && this.teacherYear.id_docente.trim() !== "";
  }

  addTeacherYear() {
    if (this.validarCampos()) {
      this.teacherYearService.addTeacherYear(this.teacherYear).subscribe(response => {
        if (response.success) {
          toastr.success("Usuario agregado!");
          this.clearFields();
        }
      })
    } else {
      toastr.info("Complete campos vacíos");
    }
  }

  onChange($event) {
    this.anioService.getMaterias(this.teacherYear.id_anio).subscribe(response => {
      if(response.success) {
        this.materias = response.data;
        this.materias = this.materias.map(year => {
          year.id_anio_materia = year.id_año_materia;
          return year;
        })
      } else {
        this.materias = [];
      }
    })
  }

}

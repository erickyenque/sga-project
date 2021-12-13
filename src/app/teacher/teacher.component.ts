import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { UserService } from '../services/user.service';
import { YearTeacherService } from '../services/year-teacher.service';
import { TeacherYearRequest } from '../types/request/TeacherYearRequest';
import { DatosResponse } from '../types/response/DatosResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacherYear: TeacherYearRequest = {
    id_anio: "",
    id_docente: ""
  };

  docentes: DatosResponse[];
  years: YearResponse[];

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

  addTeacherYear() {
    this.teacherYearService.addTeacherYear(this.teacherYear).subscribe(response => {
      if (response.success) {
        toastr.success("Usuario agregado!");
        this.clearFields();
      }
    })
  }

}

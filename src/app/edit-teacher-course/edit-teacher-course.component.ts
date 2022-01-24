import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnioService } from '../services/anio.service';
import { UserService } from '../services/user.service';
import { YearTeacherService } from '../services/year-teacher.service';
import { TeacherYearRequest } from '../types/request/TeacherYearRequest';
import { DatosResponse } from '../types/response/DatosResponse';
import { MateriasYearResponse } from '../types/response/MateriasYearResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-teacher-course',
  templateUrl: './edit-teacher-course.component.html',
  styleUrls: ['./edit-teacher-course.component.css']
})
export class EditTeacherCourseComponent implements OnInit {

  teacherYear: TeacherYearRequest = {
    id_anio: "",
    id_anio_materia: "",
    id_docente: "",
    id_materia_docente: "",
    cod_materia: ""
  };

  docentes: DatosResponse[];
  years: YearResponse[];
  materias: MateriasYearResponse[];

  routeSub: any;
  id: string;

  constructor(
    private anioService: AnioService,
    private userService: UserService,
    private teacherYearService: YearTeacherService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDocentes();
    this.getAnios();
    this.getParamsId();
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getDatos();
    });
  }


  getDatos() {
    this.anioService.buscarDocente(this.id).subscribe(response => {
      if (response.success) {
        this.teacherYear.id_anio = response.data[0].id_anio;
        this.teacherYear.id_materia_docente = response.data[0].id_materia_docente;
        this.teacherYear.cod_materia = response.data[0].cod_materia;
        this.teacherYear.id_docente = this.id;  
        this.teacherYear.id_anio_materia =  response.data[0].id_anio_materia;
        this.onChange(null);
      }
    })
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
        this.years = this.years.map(year => {
          year.id_anio = year.id_año;
          return year;
        })
      }
    });
  }

  updateTeacher() {
    this.teacherYearService.updateTeacherYear(this.teacherYear).subscribe(response => {
      if (response.success) {
        toastr.success("Docente actualizado!");
      }
    })
  }

  onChange($event) {
    this.anioService.getMaterias(this.teacherYear.id_anio).subscribe(response => {
      if (response.success) {
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

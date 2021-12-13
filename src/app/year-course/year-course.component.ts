import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { MateriasService } from '../services/materias.service';
import { YearCourseService } from '../services/year-course.service';
import { MateriaYearRequest } from '../types/request/MateriaYearRequest';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-year-course',
  templateUrl: './year-course.component.html',
  styleUrls: ['./year-course.component.css']
})
export class YearCourseComponent implements OnInit {

  materiaYear: MateriaYearRequest = {
    id_anio: "",
    cod_materia: ""
  };

  materias: MateriaResponse[];
  years: YearResponse[];

  constructor(
    private materiaService: MateriasService,
    private anioService: AnioService,
    private materiYearService: YearCourseService
  ) { }

  ngOnInit(): void {
    this.getMaterias();
    this.getAnios();
  }

  getMaterias() {
    this.materiaService.listMaterias().subscribe(response => {
      if (response.success) {
        this.materias = response.data;
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
    this.materiaYear.cod_materia = "";
  }

  addMateriaYear() {
    this.materiYearService.addMateriaYear(this.materiaYear).subscribe(response => {
      if (response.success) {
        toastr.success('Año agregado!');
        this.clearFields();
      } else {
        toastr.error('Error al guardar');
      }
    })
  }
}

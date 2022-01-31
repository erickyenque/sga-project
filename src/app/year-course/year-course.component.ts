import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { MateriasService } from '../services/materias.service';
import { YearCourseService } from '../services/year-course.service';
import { MateriaYearRequest } from '../types/request/MateriaYearRequest';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';
declare var $: any;

@Component({
  selector: 'app-year-course',
  templateUrl: './year-course.component.html',
  styleUrls: ['./year-course.component.css']
})
export class YearCourseComponent implements OnInit {

  materiaYear: MateriaYearRequest = {
    id_anio: "",
    cod_materia: "",
    dia: "",
    hora_inicio: "",
    hora_fin: ""
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
    this.setConfigB();
  }

  setConfigB() {
    $('#timepicker1').datetimepicker({
      format: 'LT'
    })
    $('#timepicker2').datetimepicker({
      format: 'LT'
    })
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

  validarCampos() {
    return this.materiaYear.id_anio.trim() !== "" && this.materiaYear.cod_materia.trim() !== "" && this.materiaYear.dia.trim() !== "" &&
      this.materiaYear.hora_inicio.trim() !== "" && this.materiaYear.hora_fin.trim() !== "";
  }

  addMateriaYear() {
    this.materiaYear.hora_inicio = $("#timepicker1").find("input").val();
    this.materiaYear.hora_fin = $("#timepicker2").find("input").val();
    if (this.validarCampos()) {
      this.materiYearService.addMateriaYear(this.materiaYear).subscribe(response => {
        if (response.success) {
          toastr.success('Año agregado!');
          this.clearFields();
        } else {
          toastr.error('Error al guardar');
        }
      })
    } else {
      toastr.info("Complete campos vacíos");
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnioService } from '../services/anio.service';
import { MateriasService } from '../services/materias.service';
import { YearCourseService } from '../services/year-course.service';
import { MateriaYearRequest } from '../types/request/MateriaYearRequest';
import { FrecuenciaResponse } from '../types/response/FrecuenciaResponse';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { YearResponse } from '../types/response/YearReponse';
declare var $: any;
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-year-course',
  templateUrl: './edit-year-course.component.html',
  styleUrls: ['./edit-year-course.component.css']
})
export class EditYearCourseComponent implements OnInit {

  materiaYear: MateriaYearRequest = {
    id_anio: "",
    cod_materia: "",
    dia: "",
    hora_inicio: "",
    hora_fin: ""
  };

  materias: MateriaResponse[];
  years: YearResponse[];
  frecuencia: FrecuenciaResponse = {
    id_frecuencia: "",
    dia: "",
    hora_inicio: "",
    hora_fin: ""
  };

  routeSub: any;

  codigo: string;

  constructor(
    private materiaService: MateriasService,
    private anioService: AnioService,
    private materiYearService: YearCourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getParamsId();
    this.getMaterias();
    this.getAnios();
    this.setConfigB();
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.materiaYear.cod_materia = params["cod_materia"];
      this.materiaYear.id_anio = params["id_anio"];
      this.getFrecuencia(params["id_frecuencia"]);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  setConfigB() {
    $('#timepicker3').datetimepicker({
      format: 'LT'
    })
    $('#timepicker4').datetimepicker({
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

  getFrecuencia(id_frecuencia) {
    this.materiaService.frecuencia(id_frecuencia).subscribe(response => {
      if (response.success) {
        this.frecuencia = response.data[0];
        $("#timepicker3").find('input').val(this.frecuencia.hora_inicio);
        $("#timepicker4").find('input').val(this.frecuencia.hora_fin);
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

  clearFields() {
    this.materiaYear.cod_materia = "";
  }

  updateFrecuencia() {
    this.frecuencia.hora_inicio = $("#timepicker3").find("input").val();
    this.frecuencia.hora_fin = $("#timepicker4").find("input").val();
    this.materiYearService.updateFrecuencia(this.frecuencia).subscribe(response => {
      if (response.success) {
        toastr.success('Horario actualizado!');
        this.clearFields();
      } else {
        toastr.error('Error al guardar');
      }
    })
  }

}

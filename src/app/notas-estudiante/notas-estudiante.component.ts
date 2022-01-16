import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { AlumnosResponse } from '../types/response/AlumnosResponse';
import Storage from '../utils/Storage';
declare var $: any;
import * as toastr from 'toastr';

@Component({
  selector: 'app-notas-estudiante',
  templateUrl: './notas-estudiante.component.html',
  styleUrls: ['./notas-estudiante.component.css']
})
export class NotasEstudianteComponent implements OnInit {

  routeSub: any;
  cod_materia: string;
  alumnos: AlumnosResponse[] = [];

  showDialog: boolean = false;
  tDialog: string = "";

  alumnoSelected: AlumnosResponse = null;

  constructor(
    private route: ActivatedRoute,
    private materiaService: MateriasService,
    private storage: Storage
  ) {
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getParamsId();
  }

  setConfigM() {
    $(function () {
      $("#example1").DataTable();
    });
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.cod_materia = params["cod_materia"];
      this.listarAlumnos();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  listarAlumnos() {
    this.materiaService.listarAlumnos(this.cod_materia).subscribe(response => {
      if (response.success) {
        this.alumnos = response.data;
        this.setConfigM();
      }
    })
  }

  selectAlumno(alumno: AlumnosResponse) {
    this.showDialog = !this.showDialog;
    this.alumnoSelected = alumno;
    this.tDialog = this.alumnoSelected.calificacion;
  }

  calificar() {
    this.materiaService.calificar({ calificacion: this.tDialog, id_matricula: this.alumnoSelected.id_matricula, cod_materia: this.cod_materia }).subscribe(response => {
      if (response.success) {
        this.showDialog = !this.showDialog;
        this.listarAlumnos();
        toastr.success("Nota registrada!")
      }
    })
  }
}

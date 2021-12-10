import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnioService } from '../services/anio.service';
import { MatriculaService } from '../services/matricula.service';
import { UserService } from '../services/user.service';
import { StudentResponse } from '../types/response/StudentResponse';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {

  routeSub: any;

  id: string = "";

  years: YearResponse[];
  user: StudentResponse = null;

  constructor(
    private userService: UserService,
    private anioService: AnioService,
    private route: ActivatedRoute,
    private matriculaService: MatriculaService
  ) { }

  ngOnInit(): void {
    this.getParamsId();
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.loadUser(this.id);
      this.getListYear();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  loadUser(id: string) {
    this.userService.datosEstudiante(id).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];
        this.user.id_anio = this.user.id_año;
      }
    })
  }

  finalizarMatricula() {
    this.matriculaService.finalizarMatricula(this.user).subscribe(response => {
      if (response.success) {
        toastr.success("Materia actualizada!");
      } else {
        toastr.error("Hubo un problema!");
      }
    })
  }

  getListYear() {
    this.anioService.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data;
        this.years = this.years.map(year => {
          year.id_anio = year.id_año;
          return year;
        })
      }
    })
  }
}

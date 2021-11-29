import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { MateriaResponse } from '../types/response/MateriaResponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {

  routeSub: any;

  codigo: string = "";

  materia: MateriaResponse = null;

  constructor(
    private route: ActivatedRoute,
    private materiaService: MateriasService
  ) { }

  ngOnInit(): void {
    this.getParamsId();
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.codigo = params["codigo"];
      this.loadMateria(this.codigo);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  loadMateria(codigo: string) {
    this.materiaService.datosMateria(codigo).subscribe(response => {
      console.log(response)
      if (response.success) {
        this.materia = response.data[0];
      }
    })
  }

  editMateria() {
    this.materiaService.editMateria(this.materia).subscribe(response => {
      if (response.success) {
        toastr.success("Materia actualizada!");
      } else {
        toastr.error("Hubo un problema!");
      }
    })
  }

}

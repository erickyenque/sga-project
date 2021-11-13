import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import { MateriaResponse } from '../types/response/MateriaResponse';
declare var $: any;

@Component({
  selector: 'app-g-courses',
  templateUrl: './g-courses.component.html',
  styleUrls: ['./g-courses.component.css']
})
export class GCoursesComponent implements OnInit {

  materias: Array<MateriaResponse>;

  constructor(
    private materiaService: MateriasService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  setConfigM() {
    $(function () {
      $("#example1").DataTable();
    });
  }

  getList() {
    this.materiaService.listMaterias().subscribe(response => {
      console.log(response)
      if(response.success) {
        this.materias = response.data;
        this.setConfigM();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { YearCourseService } from '../services/year-course.service';
import { MateriaYearResponse } from '../types/response/MateriaYearResponse';
declare var $: any;

@Component({
  selector: 'app-g-year-course',
  templateUrl: './g-year-course.component.html',
  styleUrls: ['./g-year-course.component.css']
})
export class GYearCourseComponent implements OnInit {

  materiasYear: MateriaYearResponse[];

  constructor(
    private materiaYearService: YearCourseService
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
    this.materiaYearService.listarMateriaYear().subscribe(response => {
      if (response.success) {
        this.materiasYear = response.data;
        this.setConfigM();
      }
    })
  }
}

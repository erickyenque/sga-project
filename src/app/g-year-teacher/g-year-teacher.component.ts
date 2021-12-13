import { Component, OnInit } from '@angular/core';
import { YearTeacherService } from '../services/year-teacher.service';
import { TeacherYearResponse } from '../types/response/teacherYearResponse';

@Component({
  selector: 'app-g-year-teacher',
  templateUrl: './g-year-teacher.component.html',
  styleUrls: ['./g-year-teacher.component.css']
})
export class GYearTeacherComponent implements OnInit {

  teachersYear: TeacherYearResponse[];

  constructor(
    private teacherYearService: YearTeacherService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.teacherYearService.listarTeacherYear().subscribe(response => {
      if (response.success) {
        this.teachersYear = response.data;
      }
    })
  }

}

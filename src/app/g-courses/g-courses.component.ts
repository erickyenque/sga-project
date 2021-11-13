import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-g-courses',
  templateUrl: './g-courses.component.html',
  styleUrls: ['./g-courses.component.css']
})
export class GCoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function () {
      $("#example1").DataTable();
    });
  }

}

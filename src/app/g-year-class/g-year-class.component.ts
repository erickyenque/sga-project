import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { YearResponse } from '../types/response/YearReponse';

@Component({
  selector: 'app-g-year-class',
  templateUrl: './g-year-class.component.html',
  styleUrls: ['./g-year-class.component.css']
})
export class GYearClassComponent implements OnInit {

  years: YearResponse[]

  constructor(
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.anioService.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data;
      }
    });
  }

}

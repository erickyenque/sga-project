import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { MateriasService } from '../services/materias.service';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { YearResponse } from '../types/response/YearReponse';

@Component({
  selector: 'app-r-dashboard',
  templateUrl: './r-dashboard.component.html',
  styleUrls: ['./r-dashboard.component.css']
})
export class RDashboardComponent implements OnInit {

  materias: number = 0;
  years: number = 0;

  constructor(
    private materiaService: MateriasService,
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.anioService.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data.length;
      }
    })

    this.materiaService.listMaterias().subscribe(response => {
      if (response.success) {
        this.materias = response.data.length;
      }
    })
  }

}

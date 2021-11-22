import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { YearRequest } from '../types/request/YearRequest';
import * as toastr from 'toastr';

@Component({
  selector: 'app-year-class',
  templateUrl: './year-class.component.html',
  styleUrls: ['./year-class.component.css']
})
export class YearClassComponent implements OnInit {

  year: YearRequest = {
    nombre: "",
    numero: "",
    seccion: "",
    turno: ""
  }

  constructor(
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
  }

  addYear() {
    this.anioService.addAnio(this.year).subscribe(response => {
      if (response.success) {
        toastr.success('Año agregado!');
      } else {
        toastr.error('Error al guardar');
      }
    })
  }
}

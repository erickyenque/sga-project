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
    turno: "",
    nivel: ""
  }

  constructor(
    private anioService: AnioService
  ) { }

  ngOnInit(): void {
  }

  clearFields() {
    this.year = {
      nombre: "",
      numero: "",
      seccion: "",
      turno: "",
      nivel: ""
    }
  }

  validarCampos() {
    return this.year.nombre.trim() !== "" && this.year.numero.trim() !== "" && this.year.seccion.trim() !== "" &&
    this.year.turno.trim() !== "" && this.year.nivel.trim() !== "";
  }

  addYear() {
    if (this.validarCampos()) {
      this.anioService.addAnio(this.year).subscribe(response => {
        if (response.success) {
          toastr.success('Año agregado!');
          this.clearFields();
        } else {
          toastr.error('Error al guardar');
        }
      })
    } else {
      toastr.info("Complete campos vacíos");
    }
  }
}

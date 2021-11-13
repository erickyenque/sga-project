import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import { MateriaRequest } from '../types/request/MateriaRequest';
import * as toastr from 'toastr';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  materias: MateriaRequest = {
    cod_materia: '',
    nombre: ''
  };

  constructor(
    private materiaService: MateriasService
  ) { }

  ngOnInit(): void {
    
  }

  clearFields() {
    this.materias.cod_materia = '';
    this.materias.nombre = '';
  }

  addMateria() {
    if(this.materias.cod_materia.trim() != '' && this.materias.nombre.trim() != '') {
      this.materiaService.addMateria(this.materias).subscribe(response => {
        if(response.success) {
          toastr.success('Agregado correctamente');
          this.clearFields();
        } else {
          toastr.error('Error al guardar');
        }
      })
    } else {
      toastr.warning('Campos vacíos!');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { LoginResponse } from '../types/response/LoginResponse';
import { MateriaResponse } from '../types/response/MateriaResponse';
import Storage from '../utils/Storage';

@Component({
  selector: 'app-notas-curso',
  templateUrl: './notas-curso.component.html',
  styleUrls: ['./notas-curso.component.css']
})
export class NotasCursoComponent implements OnInit {

  materias: MateriaResponse[];
  login: LoginResponse;

  constructor(
    private materiaService: MateriasService,
    private storage: Storage
  ) {
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getSession();
    this.getMyCourses();
  }

  getMyCourses() {
    if (this.login.role == 'ESTUDIANTE') {
      this.materiaService.misMaterias(this.login.id_persona).subscribe(response => {
        if (response.success) {
          this.materias = response.data;
        }
      })
    } else if (this.login.role == 'DOCENTE'){
      this.materiaService.misAsignaturas(this.login.id_persona).subscribe(response => {
        if (response.success) {
          this.materias = response.data;
        }
      })
    }
  }

  getSession() {
    this.login = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
  }

}

import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { FileResponse } from '../types/response/FileResponse';
import { LoginResponse } from '../types/response/LoginResponse';
import { MateriaResponse } from '../types/response/MateriaResponse';
import Storage from '../utils/Storage';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  materias: MateriaResponse[];
  login: LoginResponse;
  archivos: FileResponse[];

  showCourses: boolean = true;

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

  onSearchChange(searchValue: string): void {  
    this.showCourses = searchValue.length === 0;
    this.materiaService.buscarArhivos(searchValue).subscribe(response => {
      if (response.success) {
        this.archivos = response.data;
      }
    })
  }
}

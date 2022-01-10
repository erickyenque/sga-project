import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import { MateriasService } from '../services/materias.service';
import { UserService } from '../services/user.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { LoginResponse } from '../types/response/LoginResponse';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { YearResponse } from '../types/response/YearReponse';
import Storage from '../utils/Storage';

@Component({
  selector: 'app-r-dashboard',
  templateUrl: './r-dashboard.component.html',
  styleUrls: ['./r-dashboard.component.css']
})
export class RDashboardComponent implements OnInit {

  materias: number = 0;
  years: number = 0;
  students: number = 0;
  login: LoginResponse;

  constructor(
    private materiaService: MateriasService,
    private anioService: AnioService,
    private userService: UserService,
    private storage: Storage
  ) {
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getSession();
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

    this.userService.listEstudiantes().subscribe(response => {
      if (response.success) {
        this.students = response.data.length;
      }
    })
  }

  getSession() {
    this.login = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
  }

}

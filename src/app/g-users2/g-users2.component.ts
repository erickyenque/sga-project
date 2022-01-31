import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { LoginResponse } from '../types/response/LoginResponse';
import { UserResponse } from '../types/response/UserResponse';
import Storage from '../utils/Storage';
declare var $: any;
import * as toastr from 'toastr';


@Component({
  selector: 'app-g-users2',
  templateUrl: './g-users2.component.html',
  styleUrls: ['./g-users2.component.css']
})
export class GUsers2Component implements OnInit {

  users: UserResponse[];

  login: LoginResponse;

  showDialog: boolean = false;
  tDialog: string = "";

  userSelected: UserResponse = {
    dni: "",
    nombres: "",
    apePaterno: "",
    apeMaterno: "",
    direccion: "",
    referencia: "",
    genero: "",
    id_persona: "",
    estado: "",
    fecha_registro: "",
    nacimiento: "",
    role: "",
    id_usuario: ""
  };

  constructor(
    private userService: UserService,
    private storage: Storage
  ) { 
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getSession();
    this.getList();
    
  }

  setConfigM() {
    $(function () {
      $("#example1").DataTable();
    });
  }

  getList() {
    this.userService.listEstudiantes2().subscribe(response => {
      if(response.success) {
        this.users = response.data;
        this.setConfigM();
      }
    })
  }

  getSession() {
    this.login = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
  }

  abrirModal(user: UserResponse) {
    this.userSelected = user;
    this.showDialog = !this.showDialog;
  }

  cambiarRol() {
    this.userService.cambiarRol(this.userSelected).subscribe(response => {
      if(response.success) {
        this.showDialog = !this.showDialog;
        toastr.success("Usuario actualizado!");
      }
    })
  }

}

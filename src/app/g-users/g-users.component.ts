import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { LoginResponse } from '../types/response/LoginResponse';
import { UserResponse } from '../types/response/UserResponse';
import Storage from '../utils/Storage';
declare var $: any;
import * as toastr from 'toastr';

@Component({
  selector: 'app-g-users',
  templateUrl: './g-users.component.html',
  styleUrls: ['./g-users.component.css']
})
export class GUsersComponent implements OnInit {

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
    if(this.login.role === 'DIRECTOR') {
      this.userService.listUsuarios().subscribe(response => {
        if(response.success) {
          this.users = response.data;
          this.setConfigM();
        }
      })
    } else if(this.login.role === 'SECRETARIA'){
      this.userService.listEstudiantes2().subscribe(response => {
        if(response.success) {
          this.users = response.data;
          this.setConfigM();
        }
      })
    }
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

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import * as toastr from 'toastr';
import Storage from '../utils/Storage';
import { LoginResponse } from '../types/response/LoginResponse';
import StorageEnum from '../types/enumeration/StorageEnum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: UserRequest = {
    dni: "",
    nombres: "",
    apePaterno: "",
    apeMaterno: "",
    direccion: "",
    referencia: "",
    genero: "",
    nickname: "",
    password: "",
    role: ""
  }

  login: LoginResponse;

  constructor(
    private userService: UserService,
    private storage: Storage
  ) { 
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getSession();
  }

  clearFields() {
    this.user = {
      dni: "",
      nombres: "",
      apePaterno: "",
      apeMaterno: "",
      direccion: "",
      referencia: "",
      genero: "",
      nickname: "",
      password: "",
      role: ""
    }
  }

  addUser() {
    this.userService.addUsuario(this.user).subscribe(response => {
      if(response.success) {
        toastr.success("Usuario agregado!");
        this.clearFields();
      }
    });
  }

  getSession() {
    this.login = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
  }
}

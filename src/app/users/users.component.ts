import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import * as toastr from 'toastr';

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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  addUser() {
    this.userService.addUsuario(this.user).subscribe(response => {
      if(response.success) {
        toastr.success("Usuario agregado!");
      }
    });
  }
}

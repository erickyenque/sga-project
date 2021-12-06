import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import * as toastr from 'toastr';
import { AnioService } from '../services/anio.service';
import { YearResponse } from '../types/response/YearReponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  years: YearResponse[];

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
    role: "",
    id_anio: ""
  }

  constructor(
    private userService: UserService,
    private anioSerive: AnioService
  ) { }

  ngOnInit(): void {
    this.getListYear();
  }

  getListYear() {
    this.anioSerive.getList().subscribe(response => {
      if (response.success) {
        this.years = response.data;
        this.years = this.years.map(year => {
          year.id_anio = year.id_año;
          return year;
        })
      }
    })
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

  createUserStudent() {
    this.user.role = "ESTUDIANTE";
    this.user.nickname = this.user.nombres.substr(0, 3) + this.user.apePaterno.substr(0, 3);
    this.user.password = this.generatePasswordRand(6, 'num');
  }

  addUser() {
    this.createUserStudent();
    this.userService.addEstudiante(this.user).subscribe(response => {
      if (response.success) {
        toastr.success("Usuario agregado!");
        this.clearFields();
      }
    });
  }

  generatePasswordRand(length, type) {
    let characters = "";
    switch (type) {
      case 'num':
        characters = "0123456789";
        break;
      case 'alf':
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case 'rand':
        //FOR ↓
        break;
      default:
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        break;
    }
    var pass = "";
    for (let i = 0; i < length; i++) {
      if (type == 'rand') {
        pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
      } else {
        pass += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    return pass;
  }

}

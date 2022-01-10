import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';
import { LoginRequest } from '../types/request/LoginRequest';
import * as toastr from "toastr"; 
import Storage from '../utils/Storage';
import StorageEnum from '../types/enumeration/StorageEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: LoginRequest = {
    nickname: '',
    password: ''
  };

  constructor(
    private router: Router,
    private sesionService: SesionService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.storage = Storage.getInstance();
  }

  onNavigate() {
    this.router.navigate(['/dashboard']);
  }

  onLogin() {
    if(this.login.nickname.trim() != '' && this.login.password.trim() != '') {
      this.sesionService.login(this.login).subscribe(response => {
        if(response.success) {          
          this.storage.setItem(StorageEnum.SESSION_SGA, JSON.stringify(response.data[0]));
          this.onNavigate();
        } else {
          toastr.error('Usuario no válido!');
        }
      })
    } else {
      toastr.warning('Campos vacíos!');
    }
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.onLogin();
    }
  }

}

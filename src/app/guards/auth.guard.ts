import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import StorageEnum from '../types/enumeration/StorageEnum';
import { LoginResponse } from '../types/response/LoginResponse';
import Storage from '../utils/Storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  
  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.storage = Storage.getInstance();
  }

  canActivateChild() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
    
  }

  public isAuthenticated() {
    try {
      let login: LoginResponse = this.obtainToken();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public obtainToken(): LoginResponse {
    let token : string = this.storage.getItem(StorageEnum.SESSION_SGA);
    if(token) {
      let login: LoginResponse = JSON.parse(token);
      return login;
    }
    throw new Error('El usuario no esta logueado.');
  }
  
}

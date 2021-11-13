import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../types/request/LoginRequest';
import { ServerConfig } from '../config/ServerConfig';
import { SgaResponse } from '../types/response/SgaResponse';
import { LoginResponse } from '../types/response/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private controller: string = 'sesiones';

  constructor(
    private http: HttpClient
  ) { }

  login(login: LoginRequest) {
    const formData = new FormData();
    formData.append('nickname', login.nickname);
    formData.append('password', login.password);
    return this.http.post<SgaResponse<LoginResponse>>(ServerConfig.getUrl(this.controller, 'verificar'), formData);
  }
}

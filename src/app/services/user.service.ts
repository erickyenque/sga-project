import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerConfig } from '../config/ServerConfig';
import { UserRequest } from '../types/request/UserRequest';
import { SgaResponse } from '../types/response/SgaResponse';
import { UserResponse } from '../types/response/UserResponse';
import { DatosResponse } from '../types/response/DatosResponse';
import { EditUserRequest } from '../types/request/EditUserRequest';
import { EditUsersComponent } from '../edit-users/edit-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private controller: string = 'usuarios';

  constructor(
    private http: HttpClient
  ) { }

  addUsuario(user: UserRequest) {
    const formData = new FormData();
    formData.append('dni', user.dni);
    formData.append('nombres', user.nombres);
    formData.append('apePaterno', user.apePaterno);
    formData.append('apeMaterno', user.apeMaterno);
    formData.append('direccion', user.direccion);
    formData.append('referencia', user.referencia);
    formData.append('genero', user.genero);
    formData.append('nickname', user.nickname);
    formData.append('password', user.password);
    formData.append('role', user.role);
    return this.http.post<SgaResponse<any>>(ServerConfig.getUrl(this.controller, 'agregar'), formData);
  }

  listUsuarios() {
    return this.http.get<SgaResponse<UserResponse>>(ServerConfig.getUrl(this.controller, 'listar'));
  }

  datosUsuario(id) {
    const params = new HttpParams().set('id', id);
    return this.http.get<SgaResponse<DatosResponse>>(ServerConfig.getUrl(this.controller, 'datos'), { params: params });
  }

  editUsuarios(user: EditUserRequest) {
    const formData = new FormData();
    formData.append('id', user.id.toString());
    formData.append('dni', user.dni);
    formData.append('nombres', user.nombres);
    formData.append('apePaterno', user.apePaterno);
    formData.append('apeMaterno', user.apeMaterno);
    formData.append('direccion', user.direccion);
    formData.append('referencia', user.referencia);
    formData.append('genero', user.genero);
    formData.append('nickname', user.nickname);
    formData.append('password', user.password);
    formData.append('role', user.role);

    return this.http.post<SgaResponse<EditUsersComponent>>(ServerConfig.getUrl(this.controller, 'editar'), formData);
  }
}

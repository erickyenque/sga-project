import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { MateriaRequest } from '../types/request/MateriaRequest';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { SgaResponse } from '../types/response/SgaResponse';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private controller: string = 'materias';

  constructor(
    private http: HttpClient
  ) { }

  addMateria(materia: MateriaRequest) {
    const formData = new FormData();
    formData.append('cod_materia', materia.cod_materia);
    formData.append('nombre', materia.nombre);
    return this.http.post<SgaResponse<MateriaResponse>>(ServerConfig.getUrl(this.controller, 'agregar'), formData);
  }

  listMaterias() {
    return this.http.get<SgaResponse<MateriaResponse>>(ServerConfig.getUrl(this.controller, 'listar'));
  }
}

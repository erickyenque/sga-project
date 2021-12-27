import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { YearRequest } from '../types/request/YearRequest';
import { MateriasYearResponse } from '../types/response/MateriasYearResponse';
import { SgaResponse } from '../types/response/SgaResponse';
import { YearResponse } from '../types/response/YearReponse';

@Injectable({
  providedIn: 'root'
})
export class AnioService {

  private controller: string = 'anios';

  constructor(
    private http: HttpClient
  ) { }

  addAnio(year: YearRequest) {
    const formData = new FormData();
    formData.append('nombre', year.nombre);
    formData.append('numero', year.numero);
    formData.append('seccion', year.seccion);
    formData.append('turno', year.turno);
    formData.append('nivel', year.nivel);
    return this.http.post<SgaResponse<YearRequest>>(ServerConfig.getUrl(this.controller, 'agregar'), formData);
  }

  getList() {
    return this.http.get<SgaResponse<YearResponse>>(ServerConfig.getUrl(this.controller, 'listar'));
  }

  datosAnio(codigo) {
    const params = new HttpParams().set('id_año', codigo);
    return this.http.get<SgaResponse<YearResponse>>(ServerConfig.getUrl(this.controller, 'datos'), { params: params});
  }


  editAnio(year: YearResponse) {
    const formData = new FormData();
    formData.append('id_año', year.id_año.toString());
    formData.append('nombre', year.nombre);
    formData.append('numero', year.numero);
    formData.append('seccion', year.seccion);
    formData.append('turno', year.turno);
    return this.http.post<SgaResponse<YearResponse>>(ServerConfig.getUrl(this.controller, 'editar'), formData);
  }

  getMaterias(codigo) {
    const params = new HttpParams().set('id_año', codigo);
    return this.http.get<SgaResponse<MateriasYearResponse>>(ServerConfig.getUrl(this.controller, 'materias'), { params: params});
  }
}

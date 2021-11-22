import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { YearRequest } from '../types/request/YearRequest';
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
    return this.http.post<SgaResponse<YearRequest>>(ServerConfig.getUrl(this.controller, 'agregar'), formData);
  }

  getList() {
    return this.http.get<SgaResponse<YearResponse>>(ServerConfig.getUrl(this.controller, 'listar'));
  }

}

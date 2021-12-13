import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { MateriaYearRequest } from '../types/request/MateriaYearRequest';
import { MateriaYearResponse } from '../types/response/MateriaYearResponse';
import { SgaResponse } from '../types/response/SgaResponse';

@Injectable({
  providedIn: 'root'
})
export class YearCourseService {

  private controller = 'materias';

  constructor(
    private http: HttpClient
  ) { }

  addMateriaYear(materiaYear: MateriaYearRequest) {
    const formData = new FormData();
    formData.append('id_año', materiaYear.id_anio);
    formData.append('cod_materia', materiaYear.cod_materia);
    return this.http.post<SgaResponse<any>>(ServerConfig.getUrl(this.controller, 'agregar_anio'), formData);
  }

  listarMateriaYear() {
    return this.http.get<SgaResponse<MateriaYearResponse>>(ServerConfig.getUrl(this.controller, 'listar_my'));
  }
}

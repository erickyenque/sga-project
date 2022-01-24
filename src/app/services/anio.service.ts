import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { TeacherYearRequest } from '../types/request/TeacherYearRequest';
import { YearRequest } from '../types/request/YearRequest';
import { HorarioResponse } from '../types/response/HorarioResponse';
import { MateriasYearResponse } from '../types/response/MateriasYearResponse';
import { SgaResponse } from '../types/response/SgaResponse';
import { UserResponse } from '../types/response/UserResponse';
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

  
  buscarDocente(codigo) {
    const params = new HttpParams().set('id_docente', codigo);
    return this.http.get<SgaResponse<TeacherYearRequest>>(ServerConfig.getUrl(this.controller, 'buscarDocente'), { params: params});
  }

  editAnio(year: YearResponse) {
    const formData = new FormData();
    formData.append('id_año', year.id_año.toString());
    formData.append('nombre', year.nombre);
    formData.append('numero', year.numero);
    formData.append('seccion', year.seccion);
    formData.append('turno', year.turno);
    formData.append('nivel', year.nivel);
    return this.http.post<SgaResponse<YearResponse>>(ServerConfig.getUrl(this.controller, 'editar'), formData);
  }

  getMaterias(codigo) {
    const params = new HttpParams().set('id_año', codigo);
    return this.http.get<SgaResponse<MateriasYearResponse>>(ServerConfig.getUrl(this.controller, 'materias'), { params: params});
  }

  getHorario(id_estudiante) {
    const params = new HttpParams().set('id_estudiante', id_estudiante);
    return this.http.get<SgaResponse<HorarioResponse>>(ServerConfig.getUrl(this.controller, 'horario'), { params: params});
  }

  getDeudas(id_anio) {
    const params = new HttpParams().set('id_año', id_anio);
    return this.http.get<SgaResponse<UserResponse>>(ServerConfig.getUrl(this.controller, 'deudas'), { params: params});
  }

  getAlumnos(id_anio, fecha1, fecha2) {
    const params = new HttpParams().set('id_año', id_anio);
    return this.http.get<SgaResponse<UserResponse>>(ServerConfig.getUrl(this.controller, 'matriculados'), { params: params});
  }
}

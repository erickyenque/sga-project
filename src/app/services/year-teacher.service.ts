import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { TeacherYearRequest } from '../types/request/TeacherYearRequest';
import { SgaResponse } from '../types/response/SgaResponse';
import { TeacherYearResponse } from '../types/response/teacherYearResponse';

@Injectable({
  providedIn: 'root'
})
export class YearTeacherService {

  private controller = 'usuarios';

  constructor(
    private http: HttpClient
  ) { }

  addTeacherYear(teacherYear: TeacherYearRequest) {
    const formData = new FormData();
    formData.append('id_año_materia', teacherYear.id_anio_materia);
    formData.append('id_docente', teacherYear.id_docente);
    return this.http.post<SgaResponse<any>>(ServerConfig.getUrl(this.controller, 'agregar_anio'), formData);
  }

  listarTeacherYear() {
    return this.http.get<SgaResponse<TeacherYearResponse>>(ServerConfig.getUrl(this.controller, 'listar_ty'));
  }
}

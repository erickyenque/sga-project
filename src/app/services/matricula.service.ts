import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { MatricularRequest } from '../types/request/MatricularRequest';
import { SgaResponse } from '../types/response/SgaResponse';
import { StudentResponse } from '../types/response/StudentResponse';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private controller: string = 'matriculas';

  constructor(
    private http: HttpClient
  ) { }

  finalizarMatricula(student: StudentResponse) {
    const formData = new FormData();
    formData.append('id', student.id_persona.toString());
    formData.append('dni', student.dni);
    formData.append('nombres', student.nombres);
    formData.append('apePaterno', student.apePaterno);
    formData.append('apeMaterno', student.apeMaterno);
    formData.append('direccion', student.direccion);
    formData.append('referencia', student.referencia);
    formData.append('genero', student.genero);
    formData.append('pago', student.pago);
    formData.append('monto', student.monto.toString());
    formData.append('id_año', student.id_anio);
    return this.http.post<SgaResponse<StudentResponse>>(ServerConfig.getUrl(this.controller, 'finalizar'), formData);
  }

  matricularEstudiante(student: MatricularRequest) {
    const formData = new FormData();
    formData.append('id_estudiante', student.id_estudiante);
    formData.append('pago', student.pago);
    formData.append('monto', student.monto.toString());
    formData.append('estado', student.estado);
    formData.append('id_año', student.id_anio);
    return this.http.post<SgaResponse<StudentResponse>>(ServerConfig.getUrl('usuarios', 'matricularEstudiante'), formData);
  }
}

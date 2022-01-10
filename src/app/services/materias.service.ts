import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { MateriaRequest } from '../types/request/MateriaRequest';
import { FrecuenciaResponse } from '../types/response/FrecuenciaResponse';
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

  datosMateria(codigo) {
    const params = new HttpParams().set('codigo', codigo);
    return this.http.get<SgaResponse<MateriaResponse>>(ServerConfig.getUrl(this.controller, 'datos'), { params: params});
  }

  editMateria(materia: MateriaResponse) {
    const formData = new FormData();
    formData.append('cod_materia', materia.cod_materia);
    formData.append('nombre', materia.nombre);
    return this.http.post<SgaResponse<MateriaResponse>>(ServerConfig.getUrl(this.controller, 'editar'), formData);
  }

  misMaterias(id_estudiante) {
    const params = new HttpParams().set('id_estudiante', id_estudiante);
    return this.http.get<SgaResponse<MateriaResponse>>(ServerConfig.getUrl(this.controller, 'mis_materias'), { params: params});
  }

  misAsignaturas(id_docente) {
    const params = new HttpParams().set('id_docente', id_docente);
    return this.http.get<SgaResponse<MateriaResponse>>(ServerConfig.getUrl(this.controller, 'mis_asignaturas'), { params: params});
  }

  frecuencia(id_frecuencia) {
    const params = new HttpParams().set('id_frecuencia', id_frecuencia);
    return this.http.get<SgaResponse<FrecuenciaResponse>>(ServerConfig.getUrl(this.controller, 'frecuencia'), { params: params});
  }
}

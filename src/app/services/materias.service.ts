import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { FileRequest } from '../types/request/FileRequest';
import { MateriaRequest } from '../types/request/MateriaRequest';
import { ModuloRequest } from '../types/request/ModuloRequest';
import { NotaRequest } from '../types/request/NotaRequest';
import { AlumnosResponse } from '../types/response/AlumnosResponse';
import { FileResponse } from '../types/response/FileResponse';
import { FrecuenciaResponse } from '../types/response/FrecuenciaResponse';
import { MateriaResponse } from '../types/response/MateriaResponse';
import { ModulosResponse } from '../types/response/ModulosResponse';
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

  crearModulo(modulo: ModuloRequest) {
    const formData = new FormData();
    formData.append('nombre', modulo.nombre);
    formData.append('cod_materia', modulo.cod_materia);
    return this.http.post<SgaResponse<ModuloRequest>>(ServerConfig.getUrl(this.controller, 'crearModulo'), formData);
  }

  listarModulos(cod_materia) {
    const params = new HttpParams().set('cod_materia', cod_materia);
    return this.http.get<SgaResponse<ModulosResponse>>(ServerConfig.getUrl(this.controller, 'listarModulos'), { params: params});
  }

  subirArchivo(file: FileRequest) {
    const formData = new FormData();
    formData.append('file', file.file, file.file.name);
    formData.append('id_modulo', file.id_modulo);
    return this.http.post<SgaResponse<FileRequest>>(ServerConfig.getUrl(this.controller, 'subirArchivo'), formData);
  }

  listarArchivos(id_modulo: string) {
    const params = new HttpParams().set('id_modulo', id_modulo);
    return this.http.get<SgaResponse<FileResponse>>(ServerConfig.getUrl(this.controller, 'listarArchivos'), { params: params});
  }

  listarAlumnos(cod_materia) {
    const params = new HttpParams().set('cod_materia', cod_materia);
    return this.http.get<SgaResponse<AlumnosResponse>>(ServerConfig.getUrl(this.controller, 'listarAlumnos'), { params: params});
  }

  calificar(nota: NotaRequest) {
    const formData = new FormData();
    formData.append('calificacion', nota.calificacion);
    formData.append('id_matricula', nota.id_matricula);
    formData.append('cod_materia', nota.cod_materia);
    return this.http.post<SgaResponse<FileRequest>>(ServerConfig.getUrl(this.controller, 'agregarNota'), formData);
  }

  buscarArhivos(patron) {
    const params = new HttpParams().set('patron', patron);
    return this.http.get<SgaResponse<FileResponse>>(ServerConfig.getUrl(this.controller, 'buscarArchivos'), { params: params});
  }

  borrarArchivo(id_archivo) {
    const params = new HttpParams().set('id_archivo', id_archivo);
    return this.http.get<SgaResponse<FileResponse>>(ServerConfig.getUrl(this.controller, 'borrarArchivo'), { params: params});
  }
}

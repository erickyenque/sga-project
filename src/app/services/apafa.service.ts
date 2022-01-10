import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/ServerConfig';
import { PagoApafaRequest } from '../types/request/PagoApafaRequest';
import { SgaResponse } from '../types/response/SgaResponse';

@Injectable({
  providedIn: 'root'
})
export class ApafaService {

  private controller: string = 'apafas';

  constructor(
    private http: HttpClient
  ) { }

  addPago(pago: PagoApafaRequest) {
    const formData = new FormData();
    formData.append('estado', pago.estado);
    formData.append('monto', pago.monto.toString());
    formData.append('id_estudiante', pago.id_estudiante);
    formData.append('id_año', pago.id_año);
    return this.http.post<SgaResponse<PagoApafaRequest>>(ServerConfig.getUrl(this.controller, 'agregar'), formData);
  }
}

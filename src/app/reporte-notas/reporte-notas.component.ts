import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import { NotasResponse } from '../types/response/NotasResponse';

@Component({
  selector: 'app-reporte-notas',
  templateUrl: './reporte-notas.component.html',
  styleUrls: ['./reporte-notas.component.css']
})
export class ReporteNotasComponent implements OnInit {

  user: UserRequest = {
    dni: "",
    nombres: "",
    apePaterno: "",
    apeMaterno: "",
    direccion: "",
    referencia: "",
    genero: "",
    nickname: "",
    password: "",
    role: "",
    id_anio: "",
    pago: "",
    monto: 0
  }

  materias: NotasResponse[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  buscarEstudiante() {
    this.userService.datosUsuarioxDni(this.user.dni).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];     
        this.notasMaterias();   
      }
    })
  }

  notasMaterias() {
    this.userService.notasMaterias(this.user.id_persona).subscribe(response => {
      if (response.success) {
        this.materias = response.data;        
      }
    })
  }

}

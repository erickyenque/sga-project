import { Component, OnInit } from '@angular/core';
import { AnioService } from '../services/anio.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { HorarioResponse } from '../types/response/HorarioResponse';
import { LoginResponse } from '../types/response/LoginResponse';
import Storage from '../utils/Storage';
//import * as Timetable from 'src/lib/scripts/timetable';
declare var Timetable: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private anioService: AnioService,
    private storage: Storage
  ) {
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getHorario();
  }

  getHorario() {
    let session: LoginResponse = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
    this.anioService.getHorario(session.id_persona).subscribe(response => {
      if (response.success) {
        this.generateTable(response.data);
      }
    })
  }

  generateTable(horario: HorarioResponse[]) {
    var timetable = new Timetable();
    let horario_inicio = 0;
    let horario_fin = 0;
    if(horario[0].turno) {
      horario_inicio = 7;
      horario_fin = 13;
    } else {
      horario_inicio = 13;
      horario_fin = 19;
    }
    timetable.setScope(horario_inicio, horario_fin); // optional, only whole hours between 0 and 23
    timetable.useTwelveHour(); //optional, displays hours in 12 hour format (1:00PM)

    timetable.addLocations(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']);

    horario.forEach(h => {
      let hora_inicio = parseInt(h.hora_inicio.split(':')[0]);
      let minutos_inicio = parseInt(h.hora_inicio.split(':')[1]);
      let hora_fin = parseInt(h.hora_fin.split(':')[0]);
      let minutos_fin = parseInt(h.hora_fin.split(':')[1]);
      timetable.addEvent(h.nombre, h.dia, new Date(2015, 7, 17, hora_inicio, minutos_inicio), new Date(2015, 7, 17, hora_fin, minutos_fin));
    })

    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable'); // any css selector
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/request/UserRequest';
import { NotasResponse } from '../types/response/NotasResponse';
import * as html2pdf from 'html2pdf.js';
declare var $: any;
declare var Chart: any;
import * as toastr from 'toastr';
declare var moment: any;

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
  showButton = false;

  showGrafico = false;

  // Para calcular los tiempos de consulta
  tiempo_inicio: string;
  tiempo_fin: string;
  tiempo: string = "";

  presionado: boolean = false;

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
        this.showGrafico = true;
      } else {
        this.user = {
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
        this.materias = [];
        this.showGrafico = false;
        toastr.info("No se encuentra el estudiante");
      }
    })
  }

  notasMaterias() {
    this.userService.notasMaterias(this.user.id_persona).subscribe(response => {
      if (response.success) {
        this.showButton = true;
        this.materias = response.data;
        this.chart(this.materias);
      } else {
        this.showButton = false;
        this.materias = [];
      }
    })
  }

  generarPdf() {
    let element = document.getElementById('example1');
    var element2 = document.createElement('h3');
    var element3 = document.createElement('br');

    element2.append('REPORTE DE NOTAS');
    var elementToPrint = document.createElement('div');
    elementToPrint.appendChild(element2.cloneNode(true));
    elementToPrint.appendChild(element3.cloneNode(true));
    elementToPrint.appendChild(element.cloneNode(true));

    var canvas: any = document.getElementById("barChart");
    var img: any = document.getElementById("imagen");
    img.src = canvas.toDataURL();

    let element4 = document.getElementById('imagen');
    element4.style.visibility = 'visible';
    element4.style.width = '100%';
    element4.style.height = 'auto';

    var element5 = document.createElement('h3');
    element5.append('GRAFICO DE NOTAS');
    elementToPrint.appendChild(element3.cloneNode(true));
    elementToPrint.appendChild(element5.cloneNode(true));
    elementToPrint.appendChild(element3.cloneNode(true));
    elementToPrint.appendChild(element4.cloneNode(true));

    let opt = {
      margin: 1,
      filename: `REPORTE_MATRICULADOS.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(elementToPrint).set(opt).save();
    element4.style.visibility = 'hidden';
    img.src = "";
  }


  chart(notas: NotasResponse[]) {

    this.tiempo_fin = moment().format("hh:mm:ss:SSS");
    console.log("Captura de fin tiempo: ", this.tiempo_fin);
    this.diferenciaTiempo();

    let _labels = [];
    notas.forEach(nota => _labels.push(nota.nombre));
    let _data = [];
    notas.forEach(nota => _data.push(nota.calificacion));
    let _backgroundColor = [];
    notas.forEach(nota => _backgroundColor.push('rgba(255, 99, 132, 0.2)'));
    let _borderColor = [];
    notas.forEach(nota => _borderColor.push('rgba(255, 99, 132)'));

    const data = {
      labels: _labels,
      datasets: [{
        label: 'Notas',
        data: _data,
        backgroundColor: _backgroundColor,
        borderColor: _borderColor,
        borderWidth: 1
      }]
    };

    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartData = jQuery.extend(true, {}, data)
    var temp1 = data.datasets[0]
    barChartData.datasets[0] = temp1

    var barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      datasetFill: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })

  }

  seleccionar($event) {
    if (!this.presionado || this.user.dni.length === 1) {
      this.tiempo_inicio = moment().format("hh:mm:ss:SSS");
      console.log("Captura de inicio tiempo: ", this.tiempo_inicio);
      this.presionado = true;
    }
  }

  diferenciaTiempo() {
    var day1 = moment().zone('GMT');
    var splitTime1 = this.tiempo_inicio.split(/:/);
    day1.hours(parseInt(splitTime1[0])).minutes(parseInt(splitTime1[1])).seconds(parseInt(splitTime1[2])).milliseconds(parseInt(splitTime1[3]));
    
    var day2 = moment().zone('GMT');
    var splitTime2 = this.tiempo_fin.split(/:/);
    day2.hours(parseInt(splitTime2[0])).minutes(parseInt(splitTime2[1])).seconds(parseInt(splitTime2[2])).milliseconds(parseInt(splitTime2[3]));
  
    let miliseconds = day2.diff(day1, 'miliseconds');
    this.tiempo = `Tiempo de elaboración de reportes: ${miliseconds/1000}  segundos`;
  }  

}

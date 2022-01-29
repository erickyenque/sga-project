import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import StorageEnum from '../types/enumeration/StorageEnum';
import { ModuloRequest } from '../types/request/ModuloRequest';
import { LoginResponse } from '../types/response/LoginResponse';
import { ModulosResponse } from '../types/response/ModulosResponse';
import Storage from '../utils/Storage';
import * as toastr from 'toastr';

@Component({
  selector: 'app-my-courses-files',
  templateUrl: './my-courses-files.component.html',
  styleUrls: ['./my-courses-files.component.css']
})
export class MyCoursesFilesComponent implements OnInit {

  showDialog: boolean = false;
  tDialog: string = "";

  modulo: ModuloRequest;

  modulos: ModulosResponse[];

  routeSub: any;

  cod_materia: string;

  fileToUpload: File | null = null;

  moduloSelected: ModulosResponse;

  login: LoginResponse;

  constructor(
    private route: ActivatedRoute,
    private materiaService: MateriasService,
    private storage: Storage
  ) { 
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getParamsId();
    this.getSession();
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.cod_materia = params["cod_materia"];
      this.listarModulos();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  listarModulos() {
    this.materiaService.listarModulos(this.cod_materia).subscribe(response => {
      if (response.success) {
        this.modulos = response.data;
        this.modulos.forEach(modulo => {
          this.listarArchivos(modulo);
        })
      }
    })
  }

  crearModulo() {
    this.materiaService.crearModulo({ nombre: this.tDialog, cod_materia: this.cod_materia }).subscribe(response => {
      if (response.success) {
        this.showDialog = !this.showDialog;
        this.tDialog = "";
        this.listarModulos();
      }
    })
  }

  listarArchivos(modulo: ModulosResponse) {
    this.materiaService.listarArchivos(modulo.id_modulo).subscribe(response => {
      if (response.success) {
        modulo.archivos = response.data;
      }
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.materiaService.subirArchivo({file: this.fileToUpload, id_modulo: this.moduloSelected.id_modulo }).subscribe(data => {
      this.listarArchivos(this.moduloSelected);
    }, error => {
      console.log(error);
    });
  }

  selectModulo(modulo: ModulosResponse) {
    this.moduloSelected = modulo;
  }

  getSession() {
    this.login = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
  }

  borrarArchivo(modulo: ModulosResponse, id_archivo) {
    this.materiaService.borrarArchivo(id_archivo).subscribe(data => {
      toastr.success("Archivo borrado!");
      modulo.archivos = modulo.archivos.filter(archivo => archivo.id_archivos !=  id_archivo);
    }, error => {
      console.log(error);
    });
  }

}

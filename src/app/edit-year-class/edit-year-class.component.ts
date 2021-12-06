import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnioService } from '../services/anio.service';
import { YearResponse } from '../types/response/YearReponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-year-class',
  templateUrl: './edit-year-class.component.html',
  styleUrls: ['./edit-year-class.component.css']
})
export class EditYearClassComponent implements OnInit {

  routeSub: any;

  id: number = 0;

  year: YearResponse = null;

  constructor(
    private route: ActivatedRoute,
    private anioService: AnioService
  ) { }  

  ngOnInit(): void {
    this.getParamsId();
  }

  getParamsId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.loadUser(this.id);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  loadUser(id: number) {
    this.anioService.datosAnio(id).subscribe(response => {
      if (response.success) {
        this.year = response.data[0];
      }
    })
  }

  editUser() {
    this.anioService.editAnio(this.year).subscribe(response => {
      if (response.success) {
        toastr.success("Usuario actualizado!");
      } else {
        toastr.error("Hubo un problema!");
      }
    })
  }

}

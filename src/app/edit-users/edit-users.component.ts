import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { EditUserRequest } from '../types/request/EditUserRequest';
import { DatosResponse } from '../types/response/DatosResponse';
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  routeSub: any;

  id: number = 0;

  user: DatosResponse = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
    this.userService.datosUsuario(id).subscribe(response => {
      if (response.success) {
        this.user = response.data[0];
      }
    })
  }

  editUser() {
    let userMap: EditUserRequest = { ...this.user, id: this.id };
    this.userService.editUsuarios(userMap).subscribe(response => {
      if (response.success) {
        toastr.success("Usuario actualizado!");
      } else {
        toastr.error("Hubo un problema!");
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../types/response/UserResponse';
declare var $: any;

@Component({
  selector: 'app-g-students',
  templateUrl: './g-students.component.html',
  styleUrls: ['./g-students.component.css']
})
export class GStudentsComponent implements OnInit {

  users: UserResponse[]

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  setConfigM() {
    $(function () {
      $("#example1").DataTable();
    });
  }

  getList() {
    this.userService.listEstudiantes().subscribe(response => {
      if(response.success) {
        this.users = response.data;
        this.setConfigM();
      }
    })
  }

}

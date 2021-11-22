import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../types/response/UserResponse';

@Component({
  selector: 'app-g-users',
  templateUrl: './g-users.component.html',
  styleUrls: ['./g-users.component.css']
})
export class GUsersComponent implements OnInit {

  users: UserResponse[]

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.userService.listUsuarios().subscribe(response => {
      if(response.success) {
        this.users = response.data;
      }
    })
  }
}

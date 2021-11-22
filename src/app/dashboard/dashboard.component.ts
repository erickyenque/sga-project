import { Component, OnInit } from '@angular/core';
import StorageEnum from '../types/enumeration/StorageEnum';
import { LoginResponse } from '../types/response/LoginResponse';
import Storage from '../utils/Storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  login: LoginResponse;

  constructor(
    private storage: Storage
  ) { 
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
    this.getSession();
  }

  getSession() {
    this.login = JSON.parse(this.storage.getItem(StorageEnum.SESSION_SGA));
  }

}

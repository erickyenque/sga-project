import { Component, OnInit } from '@angular/core';
import StorageEnum from 'src/app/types/enumeration/StorageEnum';
import { LoginResponse } from 'src/app/types/response/LoginResponse';
import Storage from 'src/app/utils/Storage';

@Component({
  selector: 'template-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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

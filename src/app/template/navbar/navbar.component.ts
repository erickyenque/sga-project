import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import StorageEnum from 'src/app/types/enumeration/StorageEnum';
import Storage from 'src/app/utils/Storage';

@Component({
  selector: 'template-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router
  ) { 
    this.storage = Storage.getInstance();
  }

  ngOnInit(): void {
  }

  logout() {
    this.storage.removeItem(StorageEnum.SESSION_SGA);
    this.router.navigate(['login']);
  }
}

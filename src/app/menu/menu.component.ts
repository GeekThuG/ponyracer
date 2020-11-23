import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navbarCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar(): void {
  if (this.navbarCollapsed) {
    this.navbarCollapsed = false;
  }
  else {
    this.navbarCollapsed = true;
  }
  }
}

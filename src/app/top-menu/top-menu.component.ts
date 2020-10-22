import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit{

  navigationOpen: boolean = false;
  navbarStatusClass: string = "";
  navItems: any = [];

  ngOnInit() {
    // Menu items
    this.navItems = [
        {name: "Home", destination: "/"},
        {name: "Contact", destination: "/contact"}
    ];
  }

  toggleMenu(){
    this.navigationOpen = !this.navigationOpen;

    // If open
    if(this.navigationOpen)
    {
      this.navbarStatusClass = "collapse show"
    } else {
      this.navbarStatusClass = ""
    }
  }
}


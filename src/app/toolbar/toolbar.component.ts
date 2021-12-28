import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  welcomeText: string;
  @Input() appName: string;

  constructor(){
    this.welcomeText = "Welcome to the world of Angular in ";
    this.appName = "";
  }

  ngOnInit() : void {}

}

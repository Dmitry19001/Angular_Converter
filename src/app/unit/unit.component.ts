import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  units: string[] = [
    //Length
    "Km","m","cm","mm","nm",
    "Mile", "Feet", "Inch",

    //Temperature
    "Celsius", "Fahrenheit", "Kelvin",

    //Weight
    "T", "Kg", "g", "mg",
    "Ton (Imperial)", "Stone", "Pound", "Ounce",

    //Volume
    "l", "dl", "ml",
    "Gallon", "Quart", "Pint", "Fluid ounce"
  ];

  selectedFrom: string = this.units[1];
  selectedTo: string = this.units[5];

  constructor() { }

  ngOnInit(): void {
  }

  fromChangeHandler (event: any) {
    //update the ui
    this.selectedFrom = event.target.value;
  }

  toChangeHandler (event: any){
    this.selectedTo = event.target.value;
  }

  reverseClickEvent(){
    var temp = this.selectedFrom;
    this.selectedFrom = this.selectedTo;

    this.selectedTo = temp;
  }
}

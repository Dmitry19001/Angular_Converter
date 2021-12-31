import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})

export class UnitTypeComponent implements OnInit {

  static Categories: Array<{ id: number, name: string; units: string[] }>= [
    { id: 0, name: "Weight", units: ["kg", "g", "mg", "st", "lb", "oz"] } ,
    { id: 1, name: "Distance", units: ["Km", "m", "cm", "mm", "mi", "ft", "in"] },
    { id: 2, name: "Temperature", units: ["Celsius", "Fahrenheit", "Kelvin"] },
    // { id: 3, name: "Volume", units: ["l", "dl", "ml", "Gallon", "Quart", "Pint", "Fluid ounce"] } NOT IMPLEMENTED
  ];
  // categories: string[] = [ "Weight" , "Distance", "Temperature", "Volume" ];
  get categories() :  Array<{ id: number, name: string; units: string[] }>{
    return UnitTypeComponent.Categories;
  }

  static ChosenCategory: any = UnitTypeComponent.Categories[0];

  constructor() { }

  ngOnInit(): void {
  }

  onCategoryChange(event: any){
    UnitTypeComponent.ChosenCategory = UnitTypeComponent.Categories[event.target.value];
  }

}



import { Component, OnInit } from '@angular/core';
import {UnitComponent} from '../unit/unit.component';
import { UnitTypeComponent} from '../unit-type/unit-type.component'
import { TemperatureConverters } from './converters/temperature.converters';
import { DistanceConverters } from './converters/distance.converters';
import { WeightConverters } from './converters/weight.converters';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  output: string = '0';
  constructor() { }

  ngOnInit(): void {
  }

  inputOnChange(event: any){

    if (event.target.value === ""){
      this.output = "0";
      return;
    }
    this.output = this.makeCount(UnitComponent.SelectedFrom, UnitComponent.SelectedTo, event.target.value) + " " + UnitComponent.SelectedTo;
  }


  makeCount(SelectedFrom: any, SelectedTo: any, value: any): string {
    switch (UnitTypeComponent.ChosenCategory.id) {
      case 0:
        return WeightConverters.Convert(SelectedFrom, SelectedTo, value);
      case 1:
        return DistanceConverters.Convert(SelectedFrom, SelectedTo, value);
      case 2:
        return TemperatureConverters.Convert(SelectedFrom, SelectedTo, value);

      default:
        return "";
    }
  }

}

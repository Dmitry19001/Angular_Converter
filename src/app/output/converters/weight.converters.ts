export class WeightConverters {
  static Convert(SelectedFrom: any, SelectedTo: any, input: any): string {
    let output = "";

    if (SelectedFrom === SelectedTo) {
      return input;
    }

    if (IsMetric(SelectedFrom) && IsMetric(SelectedTo)) {
      output = MetricConvert(SelectedFrom, SelectedTo, input);
    }
    else if (!IsMetric(SelectedFrom) && !IsMetric(SelectedTo)) {
      output = ImperialConvert(SelectedFrom, SelectedTo, input);
    }
    else if (IsMetric(SelectedFrom) && !IsMetric(SelectedTo)){
      output = MetricToImperial(SelectedFrom, SelectedTo, input);
    }
    else if (!IsMetric(SelectedFrom) && IsMetric(SelectedTo)){
      output = ImperialToMetric(SelectedFrom, SelectedTo, input);
    }

    return output;
  }
}

function IsMetric(input: string): boolean {
  let metric = ["kg", "g", "mg"]
  return metric.includes(input);
}


function MetricToImperial(SelectedFrom: any, SelectedTo: any, input: any):string{

  // for simplicity we need to convert first to basic values like meter
  let g = SelectedFrom === "g" ?  input : MetricConvert(SelectedFrom, "g", input);
  let lb = g * 0.002204623;

  if (SelectedTo === "lb"){
    return lb.toString();
  }
  else{
    return ImperialConvert("lb", SelectedTo, lb);
  }
}


function ImperialToMetric(SelectedFrom: any, SelectedTo: any, input: any):string{

  let lb = SelectedFrom === "lb" ? input : ImperialConvert(SelectedFrom, "lb", input);
  let g = lb * 453.5924;
  if (SelectedTo === "lb"){
    return g.toString();
  }
  else{
    return MetricConvert("g", SelectedTo, g);
  }
}

function MetricConvert(SelectedFrom: any, SelectedTo: any, input: any):string{
  //Values are placed from biggest to smallest
  let metrics  = [
    {id: 0, name: "kg", offset: 1000},
    {id: 1, name: "g", offset: 1},
    {id: 2, name: "mg", offset: 1000},
  ]

  input = parseFloat(input);

  let from = metrics.find(metric => metric.name === SelectedFrom);
  let to = metrics.find(metric => metric.name === SelectedTo);

  if (from === undefined || to === undefined){
    return "0";
  }

  //Step 1 convert to meters
  let meters = from.id === 1 ? input : (from.id > 1 ? input / from.offset : input * from.offset);

  //Step 2 check if meters are needed output
  if (to.id === 1) {
    return meters.toString();
  }

  //Step 3 convert from meters to needed unit (if needed unit isn't meters)
  return (to.id > 1 ? meters * to.offset : meters / to.offset).toString();
}

function ImperialConvert(SelectedFrom: any, SelectedTo: any, input: any):string{
  //Values are placed from biggest to smallest
  let metrics  = [
    {id: 0, name: "st", up: 1, down: 14},
    {id: 1, name: "lb", up: 0.07142857, down: 16},
    {id: 2, name: "oz", up: 0.0625, down: 1}
  ]

  input = parseFloat(input);
  console.log(input);

  let from = metrics.find(metric => metric.name === SelectedFrom);
  let to = metrics.find(metric => metric.name === SelectedTo);

  if (from === undefined || to === undefined){
    return "0";
  }

  //Step 1 convert to feets
  //Checking is it bigger than meter
  let feets = from.id === 1 ? input : (from.id > 1 ? input * from.up : input * from.down);

  //Step 2 check if feets are needed output
  if (to.id === 1) {
    return feets.toString();
  }

  //Step 3 convert from feets to needed unit (if needed unit isn't feets)
  if (to.id > 1){
    return (feets * metrics[1].down).toString();
  }
  else {
    return (feets * metrics[1].up).toString();
  }

}

export class DistanceConverters {
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
  let metric = ["Km", "m", "cm", "mm"]
  return metric.includes(input);
}

function MetricToImperial(SelectedFrom: any, SelectedTo: any, input: any):string{

  // for simplicity we need to convert first to basic values like meter
  let m = SelectedFrom === "m" ?  input : MetricConvert(SelectedFrom, "m", input);
  let ft = m * 3.2808398950131;

  if (SelectedTo === "ft"){
    return ft.toString();
  }
  else{
    return ImperialConvert("ft", SelectedTo, ft);
  }
}


function ImperialToMetric(SelectedFrom: any, SelectedTo: any, input: any):string{

  let ft = SelectedFrom === "ft" ? input : ImperialConvert(SelectedFrom, "ft", input);
  let m = ft * 0.3048;
  if (SelectedTo === "m"){
    return m.toString();
  }
  else{
    return MetricConvert("m", SelectedTo, m);
  }
}

function MetricConvert(SelectedFrom: any, SelectedTo: any, input: any):string{
  //Values are placed from biggest to smallest
  let metrics  = [
    {id: 0, name: "Km", offset: 1000},
    {id: 1, name: "m", offset: 1},
    {id: 2, name: "cm", offset: 100},
    {id: 3, name: "mm", offset: 1000}
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
    {id: 0, name: "mi", up: 1, down: 5280},
    {id: 1, name: "ft", up: 0.0001893939, down: 12},
    {id: 2, name: "in", up: 0.08333333, down: 1}
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

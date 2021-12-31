export class TemperatureConverters {
  static Convert(SelectedFrom: any, SelectedTo: any, input: any): string {
    let output = "";

    if (SelectedFrom === SelectedTo) {
      return input;
    }

    switch (SelectedFrom) {
      case "Kelvin":
        if (SelectedTo === "Celsius") {
          output = KelvinToCelsius(input);
        }
        else {
          output = KelvinToFahrenheit(input);
        }
        break;
      case "Celsius":
        if (SelectedTo === "Kelvin") {
          output = CelsiusToKelvin(input);
        }
        else {
          output = CelsiusToFahrenheit(input);
        }
        break;
      case "Fahrenheit":
        if (SelectedTo === "Celsius") {
          output = FahrenheitToCelsius(input);
        }
        else {
          output = FahrenheitToKelvin(input);
        }
        break;
      default:
        output = "Unable to Convert"
        break;
    }

    return output;
  }

}

function FahrenheitToCelsius(input: string):string {
  let fahrenheit = parseFloat(input);
  let celsius = (fahrenheit - 32) / 1.8
  return celsius.toFixed(2).toString();
}


function KelvinToCelsius(input: string):string {
  let kelvin = parseFloat(input);
  let celsius = kelvin - 273.15;
  return celsius.toFixed(2).toString();
}

function KelvinToFahrenheit(input: string):string {
  let kelvin = parseFloat(input);
  let fahrenheit = (kelvin - 273.15) * 1.8 + 32;
  return fahrenheit.toFixed(2).toString();
}

function CelsiusToKelvin(input: string):string {
  let celsius = parseFloat(input);
  let kelvin = celsius + 273.15;
  return kelvin.toFixed(2).toString();
}

function FahrenheitToKelvin(input: string):string {
  let fahrenheit = parseFloat(input);
  let kelvin = (fahrenheit - 32) / 1.8 + 273.15;
  return kelvin.toFixed(2).toString();
}

function CelsiusToFahrenheit(input: string):string {
  let celsius = parseFloat(input);
  let fahrenheit = celsius * 1.8 + 32;
  return fahrenheit.toFixed(2).toString();
}

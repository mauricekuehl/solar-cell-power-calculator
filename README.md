# solar-cell-power-calculator

This is a simple tool to calculate the power of a solar cell at a given location, time, tilt, direction and solar radiation.
## Usage

```javascript
getPower(
  area,
  incline,        //in radians
  direction,      //in radians
  solarRadiation, //in i.e. watt/m²
  date,           //data object
  lat,            //latitude
  lng             //longitude
);
```

```javascript
import { getPower } from "./power-calculator.js";

//area of solar cell in m²
const area = 2;
//incline of solar cell in radians
const incline = 30 * (Math.PI / 180); //convert degrees to radians
//direction in radians (facing north = 0 / facing south = PI)
const direction = Math.PI; //180°
//solar radiation in watts per square meter
const solarRadiation = 400;
//data as a date object
const date = new Date();
//latitude longitude
const lat = 52;
const lng = 13;
//result in the unit selected as solar irradiation
const power = getPower(
  area,
  incline,
  direction,
  solarRadiation,
  date,
  lat,
  lng
);
console.log(power);
```
## How it works

This calculation works on the basis of the calculation of the area of the shadow of the solar cell. By multiplying the area of the shadow with the solar radiation, which is measured horizontally, the solar radiation acting on the solar cell is obtained.

#### To understand it better you can visit [geogebra](https://geogebra.org/m/hmhbh2d7) and see the representations with more details.

![alt text](https://github.com/mauricekuehl/solar-cell-power-calculator/blob/main/screenshots/2d-image.png?raw=true)
[2d representation](https://www.geogebra.org/m/rdpsaf68)

![alt text](https://github.com/mauricekuehl/solar-cell-power-calculator/blob/main/screenshots/3d-image.png?raw=true)
[3d representation](https://geogebra.org/m/hmhbh2d7)

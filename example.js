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

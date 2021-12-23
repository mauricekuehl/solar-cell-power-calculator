import { getPosition } from "./sun-pos.js";

export function powerOutput(
  area,
  angel,
  panelRotation,
  solarRadiation,
  date,
  lat,
  lng
) {
  //script for calculating the position of the sun by Vladimir Agafonkin
  //https://github.com/mourner/suncalc
  const sunPos = getPosition(date, lat, lng);

  const alpha = angel;
  //side a would be 1m long so that the area (a*b) is equal to b
  const b = area;
  const beta = sunPos.azimuth - panelRotation;
  const gamma = sunPos.altitude;

  const h = Math.sin(alpha) * b;
  const e = h / Math.tan(beta);
  const f = Math.cos(gamma) * e;
  const d = Math.cos(alpha) * b;

  // this is equivalent to (d + f) * a  where a = 1
  const areaShadow = d + f;

  return areaShadow * solarRadiation;
}

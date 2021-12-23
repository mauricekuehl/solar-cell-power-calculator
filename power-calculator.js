let PI = Math.PI,
  sin = Math.sin,
  cos = Math.cos,
  tan = Math.tan,
  asin = Math.asin,
  atan = Math.atan2,
  acos = Math.acos,
  rad = PI / 180;
let dayMs = 1000 * 60 * 60 * 24,
  J1970 = 2440588,
  J2000 = 2451545;
let e = rad * 23.4397;
function azimuth(H, phi, dec) {
  return PI + atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
}
function altitude(H, phi, dec) {
  return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
}
function toDays(date) {
  return toJulian(date) - J2000;
}
function toJulian(date) {
  return date.valueOf() / dayMs - 0.5 + J1970;
}
function rightAscension(l, b) {
  return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
}
function declination(l, b) {
  return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
}
function eclipticLongitude(M) {
  let C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
    P = rad * 102.9372; // perihelion of the Earth

  return M + C + P + PI;
}
function solarMeanAnomaly(d) {
  return rad * (357.5291 + 0.98560028 * d);
}
function sunCoords(d) {
  let M = solarMeanAnomaly(d),
    L = eclipticLongitude(M);

  return {
    dec: declination(L, 0),
    ra: rightAscension(L, 0),
  };
}
function siderealTime(d, lw) {
  return rad * (280.16 + 360.9856235 * d) - lw;
}
function getPosition(date, lat, lng) {
  let lw = rad * -lng,
    phi = rad * lat,
    d = toDays(date),
    c = sunCoords(d),
    H = siderealTime(d, lw) - c.ra;

  return {
    azimuth: azimuth(H, phi, c.dec),
    altitude: altitude(H, phi, c.dec),
  };
}

export function getPower(
  area,
  inclineSolarCell,
  panelRotation,
  solarRadiation,
  date,
  lat,
  lng
) {
  //script for calculating the position of the sun by Vladimir Agafonkin
  //https://github.com/mourner/suncalc
  const sunPos = getPosition(date, lat, lng);

  //side a would be 1m long so that the area (a*b) is equal to b
  const b = area;

  const alpha = inclineSolarCell;
  const gamma = sunPos.azimuth - panelRotation;
  const beta = sunPos.altitude;

  const h = Math.sin(alpha) * b;
  const e = h / Math.tan(beta);
  const f = Math.cos(gamma) * e;
  const d = Math.cos(alpha) * b;

  // this is equivalent to (d + f) * a where a = 1
  const areaShadow = d + f;

  return areaShadow * solarRadiation;
}

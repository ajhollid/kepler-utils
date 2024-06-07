/* eslint max-len: 0 */ // disable rule for clarity
const PLUTO_FULL_ORBIT = require("./pluto.json");

const orbitalApp = (() => {
  const SCALE = 80;
  const toRadians = (deg) => (deg * Math.PI) / 180;

  /**
   * Calculates the mean anomaly of an orbit
   * https://en.wikipedia.org/wiki/Mean_longitude
   * angle, 360 degrees, calculated from mean longitude: l = ϖ + M,
   *
   * @param {number} L - The mean longitude of an orbit.
   * @param {number} lPeri - The mean longitude of the perihelion.
   * @returns {number} - The mean anomaly 0f the orbit.
   *
   * @example
   * // returns 10
   * calcMeanAnom(370, 0);
   */
  const calcMeanAnom = (L, lPeri) => {
    let M = L - lPeri;
    while (M < 0) {
      M += 360;
    }
    return M;
  };

  /**
   * Calculates the eccentric anomaly of an orbit
   * http://www.jgiesen.de/kepler/kepler.html
   *
   * @param {number} ecc - The eccentricity of the orbit.
   * @param {number} m - The mean anomaly of the orbit.
   * @param {number} precision - The number of decimal places to round to.
   * @returns {number}  - The eccentric anomaly of the orbit, rounded to the specified number of decimal places.
   * @example
   *
   * // returns 0.5236
   * calcEccAnom(0.1, 30, 4);
   */
  const calcEccAnom = (ecc, m, precision) => {
    let M = m;
    const pi = Math.PI;
    const K = pi / 180.0;
    const maxIter = 30;
    let i = 0;
    const delta = 10 ** -precision;
    let E;
    let F;

    M /= 360.0;
    M = 2.0 * pi * (M - Math.floor(M));

    if (ecc < 0.8) E = m;
    else E = pi;

    F = E - ecc * Math.sin(M) - M;
    while (Math.abs(F) > delta && i < maxIter) {
      E -= F / (1.0 - ecc * Math.cos(E));
      F = E - ecc * Math.sin(E) - M;
      i += 1;
    }

    E /= K;
    return Math.round(E * 10 ** decimalPlaces) / 10 ** decimalPlaces;
  };

  /**
   * Calculates the true anomaly of an orbit
   * http://www.braeunig.us/space/plntpos.htm
   *
   * @param {number} ecc - The eccentricity of the orbit.
   * @param {number} eccAnom - The eccentric anomaly of the orbit.
   * @returns {number} - The true anomaly of the orbit.
   *
   * @example
   * // returns 60.00000000000001
   * calcTrueAnom(0.1, 30);
   */
  const calcTrueAnom = (ecc, eccAnom) => {
    const K = Math.PI / 180;
    const trueAnomArg =
      Math.sqrt((1 + ecc) / (1 - ecc)) * Math.tan(toRadians(eccAnom) / 2);
    if (trueAnomArg < 0) {
      return 2 * (Math.atan(trueAnomArg) / K + 180);
    }
    return 2 * (Math.atan(trueAnomArg) / K);
  };

  /**
   * Calculates the radius vector of an orbit
   * @param {number} a - The semi-major axis of the orbit.
   * @param {number} e - The eccentricity of the orbit.
   * @param {number} trueAnom - The true anomaly of the orbit.
   * @returns {number} The radius vector of the orbit.
   *
   * @example
   * // returns 1.25
   * calcRadiusVector(1, 0.1, 30);
   */
  const calcRadiusVector = (a, e, trueAnom) =>
    (a * (1 - e ** 2)) / (1 + e * Math.cos(toRadians(trueAnom)));

  /**
   * Calculates the heliocentric coordinates of an orbit
   * http://www.stargazing.net/kepler/ellipse.html#twig04
   *
   * @param {number} a - The semi-major axis of the orbit.
   * @param {number} e - The eccentricity of the orbit.
   * @param {number} i - The inclination of the orbit.
   * @param {number} trueAnom - The true anomaly of the orbit.
   * @param {number} lascNode - The longitude of the ascending node.
   * @param {number} lPeri - The longitude of the perihelion.
   * @returns {Object} - The heliocentric coordinates {x,y,z} of the orbit.
   *
   * @example
   * // returns { x: 0.9370425713469824, y: 0.3047684419800381, z: 0.17364817766693033 }
   * calcHelioCentric(1, 0.1, 30, 30, 30, 30);
   */
  const calcHelioCentric = (a, e, i, trueAnom, lascNode, lPeri) => {
    const r = calcRadiusVector(a, e, trueAnom);
    const x =
      r *
      (Math.cos(toRadians(lascNode)) *
        Math.cos(toRadians(trueAnom + lPeri - lascNode)) -
        Math.sin(toRadians(lascNode)) *
          Math.sin(toRadians(trueAnom + lPeri - lascNode)) *
          Math.cos(toRadians(i)));
    const y =
      r *
      (Math.sin(toRadians(lascNode)) *
        Math.cos(toRadians(trueAnom + lPeri - lascNode)) +
        Math.cos(toRadians(lascNode)) *
          Math.sin(toRadians(trueAnom + lPeri - lascNode)) *
          Math.cos(toRadians(i)));
    const z =
      r *
      (Math.sin(toRadians(trueAnom + lPeri - lascNode)) *
        Math.sin(toRadians(i)));
    return { x, y, z };
  };

  /**
   * Calculates the correction for an orbital element or angle
   *
   * @param {number} el - The initial value
   * @param {number} cY - The rate of change per century
   * @param {number} cSinceJ2000 - The number of centuries since J2000
   * @param {boolean} isAngle - Whether the value is an angle
   * @returns {number} - The corrected value
   *
   * @example
   * // returns 30
   * calcCorrection(30, 1, 0.1, true);
   */
  const calcCorrection = (el, cY, cSinceJ2000, isAngle) => {
    let correction = el + cY * cSinceJ2000;
    if (isAngle) {
      while (correction < 0) {
        correction += 360;
      }
      correction %= 360;
    }
    return correction;
  };

  /**
   * Calculates the semi-minor axis of an ellipse (orbit in this case)
   *
   * @param {number} e - The eccentricity of the ellipse
   * @param {number} a - The semi-major axis of the ellipse
   * @returns {number} The semi minor axis of the ellipse
   *
   * @example
   * // returns 0.8660254037844386
   * calcSemiMinorAxis(0.5, 1);
   */
  const calcSemiMinorAxis = (e, a) => Math.sqrt(1 - e ** 2) * a;

  /**
   * Calculates the orbital data for a given planet
   * Data from https://ssd.jpl.nasa.gov/?planet_pos, valid 1800-2050
   *
   * @param {Object} planet - The planet object containing orbital elements and their rates of change.
   * @param {number} centuriesSinceJ2000 - The number of centuries since J2000
   * @returns {Object} - The calculated orbital elements
   *
   * @example
   * // returns { a: 1.00000261, e: 0.01671123, i: 0.00005, L: 100.46435, lPeri: 102.93735, ascNode: -5.1126041666665 }
   * calcOrbitals(earth, 0.2);
   */
  const calcOrbitals = (planet, centuriesSinceJ2000) => {
    const generatedOrbitals = {};
    const { elements, cYs } = planet.orbit;
    const keys = Object.keys(elements);
    keys.forEach((key) => {
      const el = elements[key].val;
      const cY = cYs[key].val;
      generatedOrbitals[key] = calcCorrection(
        el,
        cY,
        centuriesSinceJ2000,
        elements[key].deg
      );
    });

    // Mean anomaly
    generatedOrbitals.M = calcMeanAnom(
      generatedOrbitals.L,
      generatedOrbitals.lPeri
    );

    // Eccentric anomaly
    generatedOrbitals.eccAnom = calcEccAnom(
      generatedOrbitals.e,
      generatedOrbitals.M,
      6
    );

    // True anomaly
    generatedOrbitals.trueAnom = calcTrueAnom(
      generatedOrbitals.e,
      generatedOrbitals.eccAnom
    );

    // Semi minor axis
    generatedOrbitals.b = calcSemiMinorAxis(
      generatedOrbitals.e,
      generatedOrbitals.a
    );

    // Heliocentric Coords
    generatedOrbitals.helioCentricCoords = calcHelioCentric(
      generatedOrbitals.a,
      generatedOrbitals.e,
      generatedOrbitals.i,
      generatedOrbitals.trueAnom,
      generatedOrbitals.lAscNode,
      generatedOrbitals.lPeri
    );
    return generatedOrbitals;
  };

  const getPlutoFullOrbit = () => PLUTO_FULL_ORBIT;

  return {
    calcOrbitals,
    getPlutoFullOrbit,
  };
})();

module.exports = {
  calcOrbitals: orbitalApp.calcOrbitals,
  getPlutoFullOrbit: orbitalApp.getPlutoFullOrbit,
};

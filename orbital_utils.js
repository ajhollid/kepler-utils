/* eslint max-len: 0 */ // disable rule for clarity
const PLUTO_FULL_ORBIT = require( './pluto.json' );

console.log( PLUTO_FULL_ORBIT );

const orbitalApp = ( function () {
  const SCALE = 80;
  const toRadians = deg => deg * Math.PI / 180;

  // https://en.wikipedia.org/wiki/Mean_longitude
  // angle, 360 degres, calculated from mean longitude: l = ϖ + M,
  const calcMeanAnom = ( L, lPeri ) => {
    let M = L - lPeri;
    while ( M < 0 ) {
      M += 360;
    }
    return M;
  };

  // http://www.jgiesen.de/kepler/kepler.html
  const calcEccAnom = ( ecc, m, decimalPlaces ) => {
    let M = m;
    const pi = Math.PI;
    const K = pi / 180.0;
    const maxIter = 30;
    let i = 0;
    const delta = 10 ** -decimalPlaces;
    let E;
    let F;

    M /= 360.0;
    M = 2.0 * pi * ( M - Math.floor( M ) );

    if ( ecc < 0.8 ) E = m; else E = pi;

    F = E - ( ecc * Math.sin( M ) ) - M;
    while ( ( Math.abs( F ) > delta ) && ( i < maxIter ) ) {
      E -= F / ( 1.0 - ( ecc * Math.cos( E ) ) );
      F = E - ( ecc * Math.sin( E ) ) - M;
      i += 1;
    }

    E /= K;
    return Math.round( E * ( 10 ** decimalPlaces ) ) / ( 10 ** decimalPlaces );
  };

  // http://www.braeunig.us/space/plntpos.htm
  const calcTrueAnom = ( ecc, eccAnom ) => {
    const K = Math.PI / 180;
    const trueAnomArg = ( Math.sqrt( ( 1 + ecc ) / ( 1 - ecc ) ) ) * ( Math.tan( toRadians( eccAnom ) / 2 ) );
    if ( trueAnomArg < 0 ) {
      return 2 * ( ( Math.atan( trueAnomArg ) / K ) + 180 );
    }
    return 2 * ( Math.atan( trueAnomArg ) / K );
  };

  const calcRadiusVector = ( a, e, trueAnom ) => a * ( 1 - ( e ** 2 ) ) / ( 1 + ( e * Math.cos( toRadians( trueAnom ) ) ) );

  // http://www.stargazing.net/kepler/ellipse.html#twig04
  const calcHelioCentric = ( a, e, i, trueAnom, lascNode, lPeri ) => {
    const r = calcRadiusVector( a, e, trueAnom );
    const x = r * ( ( Math.cos( toRadians( lascNode ) ) * Math.cos( toRadians( trueAnom + lPeri - lascNode ) ) ) - ( Math.sin( toRadians( lascNode ) ) * Math.sin( toRadians( trueAnom + lPeri - lascNode ) ) * Math.cos( toRadians( i ) ) ) );
    const y = r * ( Math.sin( toRadians( lascNode ) ) * Math.cos( toRadians( trueAnom + lPeri - lascNode ) ) + Math.cos( toRadians( lascNode ) ) * Math.sin( toRadians( trueAnom + lPeri - lascNode ) ) * Math.cos( toRadians( i ) ) );
    const z = r * ( Math.sin( toRadians( trueAnom + lPeri - lascNode ) ) * Math.sin( toRadians( i ) ) );
    return { x, y, z };
  };

  const calcCorrection = ( el, cY, cSinceJ2000, isAngle ) => {
    let correction = el + ( cY * cSinceJ2000 );
    if ( isAngle ) {
      while ( correction < 0 ) {
        correction += 360;
      }
      correction %= 360;
    }
    return correction;
  };

  const calcSemiMinorAxis = ( e, a ) => Math.sqrt( 1 - ( e ** 2 ) ) * a;

  // Data from https://ssd.jpl.nasa.gov/?planet_pos, valid 1800-2050
  const calcOrbitals = ( planet, centuriesSinceJ2000 ) => {
    const generatedOrbitals = {};
    const { elements, cYs } = planet.orbit;
    const keys = Object.keys( elements );
    keys.forEach( ( key ) => {
      const el = elements[key].val;
      const cY = cYs[key].val;
      generatedOrbitals[key] = calcCorrection( el, cY, centuriesSinceJ2000, elements[key].deg );
    } );

    // Mean anomaly
    generatedOrbitals.M = calcMeanAnom( generatedOrbitals.L, generatedOrbitals.lPeri );

    // Eccentric anomaly
    generatedOrbitals.eccAnom = calcEccAnom( generatedOrbitals.e, generatedOrbitals.M, 6 );

    // True anomaly
    generatedOrbitals.trueAnom = calcTrueAnom( generatedOrbitals.e, generatedOrbitals.eccAnom );

    // Semi minor axis
    generatedOrbitals.b = calcSemiMinorAxis( generatedOrbitals.e, generatedOrbitals.a );

    // Heliocentric Coords
    generatedOrbitals.helioCentricCoords = calcHelioCentric(
      generatedOrbitals.a,
      generatedOrbitals.e,
      generatedOrbitals.i,
      generatedOrbitals.trueAnom,
      generatedOrbitals.lAscNode,
      generatedOrbitals.lPeri,
    );
    return generatedOrbitals;
  };

  const getPlutoFullOrbit = () => PLUTO_FULL_ORBIT;

  return {
    calcOrbitals,
    getPlutoFullOrbit,
  };
}() );

module.exports = {
  calcOrbitals: orbitalApp.calcOrbitals,
  getPlutoFullOrbit: orbitalApp.getPlutoFullOrbit,
};


/* eslint max-len: 0 */ // disable rule for clarity

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
}() );

module.exports = {
};


const orbitalApp = ( function () {
  const SCALE = 80;

  const calcMeanAnom = ( L, lPeri ) => {
    let M = L - lPeri;
    while ( M < 0 ) {
      M += 360;
    }
    return M;
  };
}() );

module.exports = {
};


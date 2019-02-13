const app = ( function () {
  const getDate = ( gregorianDate ) => {
    // Parses a date given in format YYYY/MM/DD
    let dateComponents = gregorianDate.split( '/' );
    dateComponents = dateComponents.map( ( component, index ) => {
      let dateComponent = component;
      if ( index === 1 ) dateComponent -= 1;
      return parseInt( dateComponent, 10 );
    } );
    const [year, month, day] = dateComponents;
    const a = Math.floor( ( 14 - month ) / 12 );
    const y = ( year + 4800 ) - a;
    const m = ( month + ( 12 * a ) ) - 3;
    const julianDay = day + Math.floor( ( ( 153 * m ) + 2 ) / 5 ) + ( 365 * y ) + Math.floor( y / 4 ) - Math.floor( y / 100 ) + Math.floor( y / 400 ) - 32045;
    return julianDay;
  };

  return { getDate };
}() );


module.exports = { getDate: app.getDate };


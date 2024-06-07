const julianApp = (() => {
  const J2000 = "2000/1/1/";
  const JULIAN_CENTURY_IN_DAYS = 36525;

  /**
   * Converts a Gergorian date to a Julian date
   * https://en.wikipedia.org/wiki/Julian_day#Converting_Gregorian_calendar_date_to_Julian_Day_Number
   *
   * @param {string} gregorianDate - The gergorian date in the "YYYY/MM/DD" format
   * @returns {number} - The Julian date
   * @throws {Error} - If the date format is invalid
   *
   * @example
   * // returns 2451545
   * getJulianDate("2000/01/01");
   */
  const getJulianDate = (gregorianDate) => {
    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(gregorianDate)) {
      throw new Error('Invalid date format. Expected "YYYY/MM/DD".');
    }
    let dateComponents = gregorianDate.split("/");
    dateComponents = dateComponents.map((component) => {
      const dateComponent = component;
      return parseInt(dateComponent, 10);
    });
    const [year, month, day] = dateComponents;
    const a = Math.floor((14 - month) / 12);
    const y = Math.floor(year + 4800 - a);
    const m = month + 12 * a - 3;
    const julianDay =
      day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
    return julianDay;
  };

  /**
   * Converts a Julian date to a Gregorian date
   *
   * @param {number} julianDate - The Julian date.
   * @returns {Date} - The Gregorian date.
   * @example
   * // returns a Date object representing "2000-01-01T00:00:00.000Z"
   * getGregorianDate(2451545);
   */
  const getGregorianDate = (julianDate) => {
    const y = 4716;
    const v = 3;
    const j = 1401;
    const u = 5;
    const m = 2;
    const s = 153;
    const n = 12;
    const w = 2;
    const r = 4;
    const B = 274277;
    const p = 1461;
    const C = -38;
    const f =
      julianDate +
      j +
      Math.floor((Math.floor((4 * julianDate + B) / 146097) * 3) / 4) +
      C;
    const e = r * f + v;
    const g = Math.floor((e % p) / r);
    const h = u * g + w;
    const day = Math.floor((h % s) / u) + 1;
    const month = ((Math.floor(h / s) + m) % n) + 1;
    const year = Math.floor(e / p) - y + Math.floor((n + m - month) / n);
    return new Date(year, month - 1, day);
  };

  /**
   * Returns the Julian date for the J2000 epoch
   *
   * @returns {number} - The Julian date for the J2000 epoch
   *
   * @example
   * // returns Julian date for J2000
   * getJ2000();
   */
  const getJ2000 = () => getJulianDate(J2000);

  const getCenturiesSinceJ2000 = (julianDate) =>
    (julianDate - getJ2000()) / JULIAN_CENTURY_IN_DAYS;

  return {
    getJulianDate,
    getGregorianDate,
    getJ2000,
    getCenturiesSinceJ2000,
  };
})();

module.exports = {
  getJulianDate: julianApp.getJulianDate,
  getGregorianDate: julianApp.getGregorianDate,
  getJ2000: julianApp.getJ2000,
  getCenturiesSinceJ2000: julianApp.getCenturiesSinceJ2000,
};

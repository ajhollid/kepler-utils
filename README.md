![](https://img.shields.io/npm/v/kepler-utils.svg?style=flat)
![](https://img.shields.io/github/license/popnfresh234/kepler_utils.svg?style=flat)
![](https://img.shields.io/github/repo-size/popnfresh234/kepler-utils.svg?style=flat)
![](https://img.shields.io/github/downloads/popnfresh234/kepler-utils/total.svg?style=flat)
![](https://img.shields.io/github/last-commit/popnfresh234/kepler-utils.svg?style=flat)
![](https://img.shields.io/github/languages/top/popnfresh234/kepler-utils.svg?style=flat)

# Kepler Utils
This node package uses JPL's [Keplerian Elements for Aproximation of the Major Planets](https://ssd.jpl.nasa.gov/?planet_pos) to calculate the heliocentric positions of the planets in our solar system for a given date.  It provides a set of tools for converting Gregorian dates to Julian dates as well as calculating the positions of the planets.

## Getting Started
Follow the instructions below to get this module up and running on your sytstem

### Prerequisites
You will need to have the [NodeJS](https://nodejs.org/en/) environment installed on your machine if you want to use the [NodeJS Package Manager](https://www.npmjs.com/) to install this project.

### Installing
You can add this package to your project by running

```
$ npm install kepler-utils
```

You can also clone this project if you want to use it without NodeJS

```
$ git clone https://github.com/popnfresh234/kepler-utils.git
```

### Usage
First, require the module in your project

```js
const KeplerUtils = require('kepler-utils');
```

The `KeplerUtils` project contains two helper modules, `JulianUtils` for converting dates and `OrbitalUtils` for calculating orbital positions.

Typical usage would be to calculate the orbital positions of a planet at a given date.  For this we make use of the `OrbitalUtils` module.  The `OribtalUtils` module provides a method that takes a planet object provided by `KeplerUtils` and the number of centuries since the [J2000](https://en.wikipedia.org/wiki/Earth-centered_inertial#J2000) reference frame.  The number of centuries since J2000 is given by a helper method in the `JulianUtils` module.

```js
const SolarSystem = KeplerUtils.SolarSystem;
const julianDate = KeplerUtils.getJulianDate('1985/04/30');
const centuriesSinceJ2000 = KeplerUtils.Julianutils.getCenturiesSincej2000(julianDate);
const marsPosition = KeplerUtils.OrbitalUtils.calcOrbitals(SolarSystem.mars, centuriesSinceJ2000);
```

#### JulianUtils Functions

```js
getJulianDate ( gregorianDate )
```

Takes a Gregorian date in the format `YYYY/MM/DD` and returns the equivalent Julian Date


```js
getGregorianDate ( julianDate )
```

Takes a Julian date and returns a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object for that day.


```js
getJ2000 ()
```
Returns the Julian date for the J2000 reference date of 2000/1/1

```js
getCenturiesSinceJ2000 ( gregorianDate )
```

Takes a Gregorian date in the format `YYYY/MM/DD` and returns the numbers of centuries elapsed since J2000.


#### OrbitalUtils Functions

```js
calcOrbitals ( planet, centuriesSinceJ2000 )
```

Takes a `Planet` object provided by `KeplerUtils.SolarSystem` and the number of centuries elapsed since J2000 provided by `KeplerUtils.JulianUtils` and returns an object with data about the given planets position in space.

Typical output is as follows:

```js
{
  a: 1.5237076300553047,
  e: 0.09338253541738535,
  i: 1.850884457379603,
  L: 67.15410829602524,
  lPeri: 335.9911658129864,
  lAscNode: 49.60246570018125,
  M: 91.16294248303882,
  eccAnom: 96.479194,
  trueAnom: 101.77532685909541,
  b: 1.5170494907935048,
  helioCentricCoords:
     {
       x: 0.3265591021725068,
       y: 1.50455324006384,
       z: 0.023473333963656553,
     },
};
```

The keys of the returned object is as follows:

| Key | Property | Units| 
|-----|----------|------|
| a | semi-major axis | au |
|e| eccentricity| unitless|
|i| inclination | degrees|
|L| mean longitude | degrees|
|lPeri| longitude of perihelion | degrees|
|lAscNode|longitude of ascending node|degrees|
|M|mean anomaly|degrees|
|eccAnom|eccentric anomaly|degrees|
|trueAnom|true anomaly|degrees|
|b|semi minor axis|au|
|heliocentricCoords|rectangular coords of plaents|au|


This data can then be used to plot the positions of the planets for whatever use case you may have.

```js
getPlutoFullOrbit ()
```

This method returns an `[]` of objects containing rectangular coordinates for an entire period of Pluto's orbit.  As Pluto's orbit doesn't fit a perfect ellipse well, we can make use of  these points to manually plot the path of Pluto's orbit for dispaly purposes.

An example of the output of this function is as follow:

```js
[ 
  { x: -20.256870769288906,
    y: -20.126040799230992,
    z: 8.01303272889247 },
  { x: -20.209017036396666,
    y: -20.177347181609036,
    z: 8.004682070653734 },
    ...
]
```

## Versioning

This project uses [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

The following resources were indispensable for creating this project

* JPL's [Keplerian Elements for Aproximate Positions of the Major Planets](https://ssd.jpl.nasa.gov/?planet_pos)
* Wikipedia entry on [Orbital Elements](https://en.wikipedia.org/wiki/Orbital_elements) for a high level overview
* Wikipedia entry on [Julian Dates](https://en.wikipedia.org/wiki/Julian_day#Converting_Gregorian_calendar_date_to_Julian_Day_Number)
* Wikipedia entry on [Mean Longitude](https://en.wikipedia.org/wiki/Mean_longitude)
* [J. Giesen's website](http://www.jgiesen.de/kepler/kepler.html) regarding Kepler and solving for the eccentric anomaly
* [Rocket and Space Technology](http://www.braeunig.us/space/plntpos.htm) regarding solving for the True Anomaly
* [Stargazing Network](http://www.stargazing.net/kepler/ellipse.html#twig04) regarding converting from polar to rectangular coordinates.

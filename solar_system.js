// Relative size factors from https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_ratio.html
// Scale factors from http://www.planetaryorbits.com/kepler-laws-orbital-elements.html

const mercury = {
  display: 'Mercury',
  name: 'mercury',
  scaleFactor: 1,
  rFactor: 0.383,
  color: '#60597B',
  apiDate: '1985/7/22',
  periDate: '1985/6/8',
  orbit: {
    elements: {
      a: { val: 0.38709843, deg: false },
      e: { val: 0.20563661, deg: false },
      i: { val: 7.00559432, deg: true },
      L: { val: 252.25166724, deg: true },
      lPeri: { val: 77.45771895, deg: true },
      lAscNode: { val: 48.33961819, deg: true },
    },
    cYs: {
      a: {
        val:
           0,
        deg: false,
      },
      e: { val: 0.00002123, deg: false },
      i: { val: -0.00590158, deg: true },
      L: { val: 149472.67486623, deg: true },
      lPeri: { val: 0.15940013, deg: true },
      lAscNode: { val: -0.12214182, deg: true },
    },
  },
};

const venus = {
  display: 'Venus',
  name: 'venus',
  scaleFactor: 1,
  rFactor: 0.949,
  color: '#E38E3E',
  apiDate: '1986/1/27',
  periDate: '1985/10/7',
  orbit: {
    elements: {
      a: { val: 0.72333566, deg: false },
      e: { val: 0.00677672, deg: false },
      i: { val: 3.39467605, deg: true },
      L: { val: 181.9790995, deg: true },
      lPeri: { val: 131.60246718, deg: true },
      lAscNode: { val: 76.67984255, deg: true },
    },
    cYs: {
      a: { val: 0.0000039, deg: false },
      e: { val: -0.00004107, deg: false },
      i: { val: -0.0007889, deg: true },
      L: { val: 58517.81538729, deg: true },
      lPeri: { val: 0.00268329, deg: true },
      lAscNode: { val: -0.27769418, deg: true },
    },
  },
};

const earth = {
  display: 'Earth',
  name: 'earth',
  scaleFactor: 1,
  rFactor: 1,
  color: '#00aeff',
  apiDate: '1987/7/5',
  periDate: '1987/1/4',
  orbit: {
    elements: {
      a: { val: 1.00000261, deg: false },
      e: { val: 0.01671123, deg: false },
      i: { val: -0.00001531, deg: true },
      L: { val: 100.46457166, deg: true },
      lPeri: { val: 102.93768193, deg: true },
      lAscNode: { val: 0.0, deg: true },
    },
    cYs: {
      a: { val: 0.00000562, deg: false },
      e: { val: -0.00004392, deg: false },
      i: { val: -0.01294668, deg: true },
      L: { val: 35999.37244981, deg: true },
      lPeri: { val: 0.32327364, deg: true },
      lAscNode: { val: 0.0, deg: true },
    },
  },
};

const mars = {
  display: 'Mars',
  name: 'mars',
  scaleFactor: 1,
  rFactor: 0.532,
  color: '#CF7167',
  apiDate: '1987/9/4',
  periDate: '1988/8/13',
  orbit: {
    elements: {
      a: { val: 1.52371034, deg: false },
      e: { val: 0.0933941, deg: false },
      i: { val: 1.84969142, deg: true },
      L: { val: -4.55343205, deg: true },
      lPeri: { val: -23.94362959, deg: true },
      lAscNode: { val: 49.55953891, deg: true },
    },
    cYs: {
      a: { val: 0.00001847, deg: false },
      e: { val: 0.00007882, deg: false },
      i: { val: -0.00813131, deg: true },
      L: { val: 19140.30268499, deg: true },
      lPeri: { val: 0.44441088, deg: true },
      lAscNode: { val: -0.29257343, deg: true },
    },
  },
};

const jupiter = {
  display: 'Jupiter',
  name: 'jupiter',
  scaleFactor: 2.5,
  rFactor: 11.21,
  color: '#9A7268',
  apiDate: '1993/6/2',
  periDate: '1999/5/8',
  orbit: {
    elements: {
      a: {
        val: 5.202887,
        deg: false,
      },
      e: { val: 0.04838624, deg: false },
      i: { val: 1.30439695, deg: true },
      L: { val: 34.39644051, deg: true },
      lPeri: { val: 14.72847983, deg: true },
      lAscNode: { val: 100.47390909, deg: true },
    },
    cYs: {
      a: {
        val: -0.00011607,
        deg: false,
      },
      e: { val: -0.00013253, deg: false },
      i: { val: -0.00183714, deg: true },
      L: { val: 3034.74612775, deg: true },
      lPeri: { val: 0.21252668, deg: true },
      lAscNode: { val: 0.20469106, deg: true },
    },
  },
};

const saturn = {
  display: 'Saturn',
  name: 'saturn',
  scaleFactor: 3.5,
  rFactor: 9.45,
  color: '#FEE3B8',
  apiDate: '1988/10/8',
  periDate: '2003/6/26',
  orbit: {
    elements: {
      a: { val: 9.53667594, deg: false },
      e: { val: 0.05386179, deg: false },
      i: { val: 2.48599187, deg: true },
      L: { val: 49.95424423, deg: true },
      lPeri: { val: 92.59887831, deg: true },
      lAscNode: { val: 113.66242448, deg: true },
    },
    cYs: {
      a: { val: -0.0012506, deg: false },
      e: { val: -0.00050991, deg: false },
      i: { val: 0.00193609, deg: true },
      L: { val: 1222.49362201, deg: true },
      lPeri: { val: -0.41897216, deg: true },
      lAscNode: { val: -0.28867794, deg: true },
    },
  },
};

const uranus = {
  display: 'Uranus',
  name: 'uranus',
  scaleFactor: 6.2,
  rFactor: 4.01,
  color: '#0D7EAA',
  apiDate: '2008/10/18',
  periDate: '1966/10/7',
  orbit: {
    elements: {
      a: { val: 19.18916464, deg: false },
      e: { val: 0.04725744, deg: false },
      i: { val: 0.77263783, deg: true },
      L: { val: 313.23810451, deg: true },
      lPeri: { val: 170.9542763, deg: true },
      lAscNode: { val: 74.01692503, deg: true },
    },
    cYs: {
      a: { val: -0.00196176, deg: false },
      e: { val: -0.00004397, deg: false },
      i: { val: -0.00242939, deg: true },
      L: { val: 428.48202785, deg: true },
      lPeri: { val: 0.40805281, deg: true },
      lAscNode: { val: 0.04240589, deg: true },
    },
  },
};

const neptune = {
  display: 'Neptune',
  name: 'neptune',
  scaleFactor: 8.7,
  rFactor: 3.88,
  color: '#536BA7',
  apiDate: '1963/6/23',
  periDate: '1881/3/9',
  orbit: {
    elements: {
      a: { val: 30.06992276, deg: false },
      e: { val: 0.00859048, deg: false },
      i: { val: 1.77004347, deg: true },
      L: { val: -55.12002969, deg: true },
      lPeri: { val: 44.96476227, deg: true },
      lAscNode: { val: 131.78422574, deg: true },
    },
    cYs: {
      a: { val: 0.00026291, deg: false },
      e: { val: 0.00005105, deg: false },
      i: { val: 0.00035372, deg: true },
      L: { val: 218.45945325, deg: true },
      lPeri: { val: -0.32241464, deg: true },
      lAscNode: { val: -0.00508664, deg: true },
    },
  },
};

const pluto = {
  display: 'Pluto',
  name: 'pluto',
  rFactor: 0.186,
  scaleFactor: 8.7,
  color: '#715138',
  apiDate: '2114/2/15',
  periDate: '1989/9/5',
  orbit: {
    elements: {
      a: { val: 39.48211675, deg: false },
      e: { val: 0.2488273, deg: false },
      i: { val: 17.14001206, deg: true },
      L: { val: 238.92903833, deg: true },
      lPeri: { val: 224.06891629, deg: true },
      lAscNode: { val: 110.30393684, deg: true },
    },
    cYs: {
      a: { val: -0.00031596, deg: false },
      e: { val: 0.0000517, deg: false },
      i: { val: 0.00004818, deg: true },
      L: { val: 145.20780515, deg: true },
      lPeri: { val: -0.04062942, deg: true },
      lAscNode: { val: -0.01183482, deg: true },
    },
  },
};


module.exports = {
  mercury,
  venus,
  mars,
  earth,
  jupiter,
  saturn,
  uranus,
  neptune,
  pluto,
};


import {
  darkBlue,
  lightBlue,
  superLightBlue,
  darkRed,
  lightRed,
  lightGray,
  mainGray,
  darkGray,
  hoverGray,
  white,
  tv,
  landLine,
  internet,
  mobile,
  error,
  success,
  waiting,
} from './colors';

export default {
  primary: {
    light: superLightBlue,
    main: lightBlue,
    dark: lightBlue,
    contrastText: lightGray,
  },
  secondary: {
    light: lightRed,
    main: lightRed,
    dark: darkRed,
    contrastText: lightGray,
  },
  gray: {
    light: lightGray,
    main: mainGray,
    dark: darkGray,
    hover: hoverGray,
  },
  white: {
    main: white,
  },
  blue: {
    main: darkBlue,
  },
  colorByProducts: {
    tv,
    landLine,
    internet,
    mobile,
  },
  status: {
    error,
    success,
    waiting,
  },
};

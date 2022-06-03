import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { generateKeyPair } from "crypto";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme(

  {
    fonts,
    breakpoints,
    colors: {
      primary:
      {
        50: '#e3f3ff',
        100: '#c3d7f0',
        200: '#9fbde0',
        300: '#7ba2d1',
        400: '#5687c2',
        500: '#3d6ea9',
        600: '#2d5584',
        700: '#1f3d60',
        800: '#0e253c',
        900: '#000d1b',
      },
      secondary: {
        main: '#DBE2EF'
      },
      background: {
        main: '#F9F7F7'
      }
    },
  }

  ,
  withDefaultColorScheme({
    colorScheme: 'primary'
  })
);

export default theme;

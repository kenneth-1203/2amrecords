import { createGlobalStyle } from "styled-components";

const sizes = {
  desktop: "@media screen and (max-width: 1600px)",
  tabLand: "@media screen and (max-width: 1200px)",
  tabPort: "@media screen and (max-width: 900px)",
  mobile: "@media screen and (max-width: 600px)",
  smallMobile: "@media screen and (max-width: 420px)",
};

export const theme = {
  colors: {
    primary: {
      main: "rgb(0, 0, 0)",
      900: "rgba(0, 0, 0, .9)",
      800: "rgba(0, 0, 0, .8)",
      700: "rgba(0, 0, 0, .7)",
      600: "rgba(0, 0, 0, .6)",
      500: "rgba(0, 0, 0, .5)",
      400: "rgba(0, 0, 0, .4)",
      300: "rgba(0, 0, 0, .3)",
      200: "rgba(0, 0, 0, .2)",
      100: "rgba(0, 0, 0, .1)",
      50: "rgba(0, 0, 0, .05)",
      25: "rgba(0, 0, 0, .025)",
    },
    secondary: {
      main: "rgb(255, 255, 255)",
      900: "rgba(255, 255, 255, .9)",
      800: "rgba(255, 255, 255, .8)",
      700: "rgba(255, 255, 255, .7)",
      600: "rgba(255, 255, 255, .6)",
      500: "rgba(255, 255, 255, .5)",
      400: "rgba(255, 255, 255, .4)",
      300: "rgba(255, 255, 255, .3)",
      200: "rgba(255, 255, 255, .2)",
      100: "rgba(255, 255, 255, .1)",
      50: "rgba(255, 255, 255, .05)",
      25: "rgba(255, 255, 255, .025)",
    },
    red: {
      main: "rgb(221,83,83)",
      900: "rgba(221,83,83,.9)",
      800: "rgba(221,83,83,.8)",
      700: "rgba(221,83,83,.7)",
      600: "rgba(221,83,83,.6)",
      500: "rgba(221,83,83,.5)",
      400: "rgba(221,83,83,.4)",
      300: "rgba(221,83,83,.3)",
      200: "rgba(221,83,83,.2)",
      100: "rgba(221,83,83,.1)",
      50: "rgba(221,83,83,.05)",
      25: "rgba(221,83,83,.025)",
    },
    orange: {
      main: "rgb(240,183,83)",
      900: "rgb(240, 183, 0,.9)",
      800: "rgb(240, 183, 0,.8)",
      700: "rgb(240, 183, 0,.7)",
      600: "rgb(240, 183, 0,.6)",
      500: "rgb(240, 183, 0,.5)",
      400: "rgb(240, 183, 0,.4)",
      300: "rgb(240, 183, 0,.3)",
      200: "rgb(240, 183, 0,.2)",
      100: "rgb(240, 183, 0,.1)",
      50: "rgb(240, 183, 0,.05)",
      25: "rgb(240, 183, 0,.025)",
    },
    green: {
      main: "rgb(18, 204, 86)",
      900: "rgb(18, 204, 86,.9)",
      800: "rgb(18, 204, 86,.8)",
      700: "rgb(18, 204, 86,.7)",
      600: "rgb(18, 204, 86,.6)",
      500: "rgb(18, 204, 86,.5)",
      400: "rgb(18, 204, 86,.4)",
      300: "rgb(18, 204, 86,.3)",
      200: "rgb(18, 204, 86,.2)",
      100: "rgb(18, 204, 86,.1)",
      50: "rgb(18, 204, 86,.05)",
      25: "rgb(18, 204, 86,.025)",
    },
  },
  sizes: sizes,
};

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  scroll-behavior: smooth;
}

body {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  overflow: overlay;
}

a {
  text-decoration: none;
}

a:link,
a:hover,
a:active,
a:visited {
  color: inherit;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.1);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,.2); 
}

/* desktop */
${sizes.desktop} {
  html {
    font-size: 90%;
  }
}

/* tablet landscape */
${sizes.tabLand} {
  html {
    font-size: 85%;
  }
}

/* tablet portrait */
${sizes.tabPort} {
  html {
    font-size: 80%;
  }
}

/* mobile */
${sizes.mobile} {
  html {
    font-size: 85%;
  }
}

/* small mobile */
${sizes.smallMobile} {
  html {
    font-size: 85%;
  }
}
`;

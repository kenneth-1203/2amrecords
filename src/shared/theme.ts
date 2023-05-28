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

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.3);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,.5); 
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
    font-size: 90%;
  }
}

/* small mobile */
${sizes.smallMobile} {
  html {
    font-size: 90%;
  }
}
`;

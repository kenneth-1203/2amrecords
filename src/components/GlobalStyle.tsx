import { createGlobalStyle } from "styled-components";

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

.svg-inline--fa {
  color: black !important;
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
@media screen and (max-width: 1600px) {
  html {
    font-size: 90%;
  }
}

/* tablet landscape */
@media screen and (max-width: 1200px) {
  html {
    font-size: 85%;
  }
}

/* tablet portrait */
@media screen and (max-width: 900px) {
  html {
    font-size: 80%;
  }
}

/* mobile */
@media screen and (max-width: 600px) {
  html {
    font-size: 90%;
  }
}
`;

import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "@/shared/theme";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
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

/* desktop */
@media screen and (max-width: 1600px) {
  html {
    font-size: 80%;
  }
}

/* tablet landscape */
@media screen and (max-width: 1200px) {
  html {
    font-size: 80%;
  }
}

/* tablet portrait */
@media screen and (max-width: 800px) {
  html {
    font-size: 70%;
  }
}

/* mobile */
@media screen and (max-width: 500px) {
  html {
    font-size: 70%;
  }
}
`;

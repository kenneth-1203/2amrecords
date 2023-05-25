import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@/shared/theme";
import { GlobalStyle } from "@/components/GlobalStyle";
import Layout from "@/components/Layout";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

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

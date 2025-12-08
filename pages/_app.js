import * as React from "react";
import Head from "next/head";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

const theme = createTheme({
  palette: { mode: "light" },
  typography: { fontFamily: "Inter, sans-serif" },
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import theme from "@/shared/theme/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
        <Script
          src={`//code.tidio.co/2pe6u1h7hojkccweeyfqbxsvj9l3ffsx.js`}
          async
        />
        <Analytics />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

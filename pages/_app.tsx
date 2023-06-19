import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import theme from "@/shared/theme/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      disable: "mobile",
    });
  }, []);
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

import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import theme from "@/shared/theme/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

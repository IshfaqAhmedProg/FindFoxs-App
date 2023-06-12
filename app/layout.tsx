"use client";
import Cursor from "@/components/LandingComponents/Cursor";
import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import theme from "@/shared/theme/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <NavBar />
            <Cursor />
            <div style={{ height: "100vh", width: "100%" }}>{children}</div>
            <Script
              src={`//code.tidio.co/2pe6u1h7hojkccweeyfqbxsvj9l3ffsx.js`}
              async
            />
            <Analytics />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

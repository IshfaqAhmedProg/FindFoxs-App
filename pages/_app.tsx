import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import theme from "@/shared/themes/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
const dashboardLayout: Array<string> = [
  "dashboard",
  "leads",
  "tasks",
  "tools",
  "crm",
];
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <NavBar />
        {dashboardLayout.includes(router.pathname.split("/")[1]) ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <Script
          src={`//code.tidio.co/2pe6u1h7hojkccweeyfqbxsvj9l3ffsx.js`}
          async
        />
        <Analytics />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
